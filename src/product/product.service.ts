import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schema';
import { Category, CategoryDocument } from '../category/schema';
import { StorageService } from '../utils';
import { DetailsDto, InformationDto, ProductDto, ProductUpdateDto, ReviewDto } from './dto';
import { FilterQuery } from './interfaces';
import { Product, ProductDocument } from './schema';
import { AllProductsResponse, FeaturedProductsOnHome } from './types';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly storageService: StorageService
    ) {}

    async create(dto: ProductDto, images: Express.Multer.File[]): Promise<Product> {
        if (!images.length) {
            throw new ForbiddenException('Product images are required');
        }

        const product = await this.productModel.findOne({ code: dto.code });
        if (product) {
            throw new ForbiddenException('product code already exists');
        }

        const category = await this.categoryModel.findOne({ name: dto.category });
        if (!category) {
            throw new ForbiddenException('category does not exist');
        }

        if (dto.subCategory) {
            const subCategory = category.subCategories.find(
                (subCategory) => subCategory.name === dto.subCategory
            );
            if (!subCategory) {
                throw new ForbiddenException('sub category does not exist');
            }
        }

        // upload images
        const imagePaths: string[] = [];
        const keys: string[] = [];

        for (const image of images) {
            const { location, key } = await this.storageService.uploadFile(image);
            imagePaths.push(location);
            keys.push(key);
        }

        const newProduct = new this.productModel({
            ...dto,
            images: imagePaths,
            keys,
        });

        await newProduct.save();

        return newProduct;
    }

    async findAll(
        page: number,
        size: number,
        highFirst: boolean,
        searchQuery: string,
        filterQuery: FilterQuery
    ): Promise<AllProductsResponse> {
        if (searchQuery) {
            const products = await this.productModel
                .find({
                    $or: [
                        { name: { $regex: searchQuery, $options: 'i' } },
                        { code: { $regex: searchQuery, $options: 'i' } },
                        { category: { $regex: searchQuery, $options: 'i' } },
                        { subCategory: { $regex: searchQuery, $options: 'i' } },
                        { shortDescription: { $regex: searchQuery, $options: 'i' } },
                    ],
                })
                .limit(size)
                .skip((page - 1) * size);

            const count = await this.productModel.countDocuments({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { code: { $regex: searchQuery, $options: 'i' } },
                    { category: { $regex: searchQuery, $options: 'i' } },
                    { subCategory: { $regex: searchQuery, $options: 'i' } },
                    { shortDescription: { $regex: searchQuery, $options: 'i' } },
                ],
            });

            return { count, products };
        }

        const products = await this.productModel
            .find({ ...filterQuery })
            .sort({ regularPrice: highFirst ? -1 : 1 })
            .limit(size)
            .skip((page - 1) * size);

        const count = await this.productModel.countDocuments({ ...filterQuery });

        return { count, products };
    }

    async findFeaturedOnHome(): Promise<FeaturedProductsOnHome[]> {
        const response: {
            index: number;
            tagline: string;
            products: Product[];
        }[] = [];

        // find featured categories
        const featuredCategories = await this.categoryModel.find({ isFeatured: true });

        // find featured products for each featured category
        for (const category of featuredCategories) {
            const products = await this.productModel
                .find({
                    category: category.name,
                    isFeatured: true,
                })
                .limit(10);

            response.push({
                index: category.index,
                tagline: category.tagline || category.name,
                products: products,
            });
        }

        // sort by index
        response.sort((a, b) => a.index - b.index);

        // return the response without index
        return response.map((item) => ({
            tagline: item.tagline,
            products: item.products,
        }));
    }

    async findOne(id: string | number): Promise<Product> {
        try {
            const product = (await this.productModel.findById(id)).toObject();

            // populate related products
            const relatedProducts: Product[] = [];
            for (const relatedProductId of product.relatedProducts) {
                const relatedProduct = await this.productModel.findById(relatedProductId);
                if (relatedProduct) {
                    relatedProducts.push(relatedProduct);
                }
            }

            (product.relatedProducts as unknown as Product[]) = relatedProducts;

            return product as unknown as Product;
        } catch (error) {
            throw new ForbiddenException('product does not exist');
        }
    }

    async update(
        id: string | number,
        dto: ProductUpdateDto,
        images: Express.Multer.File[]
    ): Promise<Product> {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new ForbiddenException('product does not exist');
        }

        if (dto.category) {
            const category = await this.categoryModel.findOne({ name: dto.category });

            if (!category) {
                throw new ForbiddenException('category does not exist');
            }

            if (dto.subCategory) {
                const subCategory = category.subCategories.find(
                    (subCategory) => subCategory.name === dto.subCategory
                );
                if (!subCategory) {
                    throw new ForbiddenException('sub category does not exist');
                }
            }
        }

        if (images.length) {
            // delete old files first
            for (const key of product.keys) {
                await this.storageService.deleteFile(key);
            }

            const imagePaths: string[] = [];
            const keys: string[] = [];

            // override new image paths
            for (const image of images) {
                const { location, key } = await this.storageService.uploadFile(image);
                imagePaths.push(location);
                keys.push(key);
            }

            (dto as any).images = imagePaths;
            (dto as any).keys = keys;
        }

        return await this.productModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async delete(id: string | number): Promise<Product> {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new ForbiddenException('product does not exist');
        }

        // delete images
        for (const key of product.keys) {
            await this.storageService.deleteFile(key);
        }

        // delete product
        await product.remove();

        return product;
    }

    async addReview(
        userId: number | string,
        productId: string | number,
        dto: ReviewDto
    ): Promise<string> {
        const user = await this.userModel.findById(userId, { password: 0, refreshToken: 0 });

        if (!user) {
            throw new ForbiddenException('invalid user');
        }

        const product = await this.productModel.findById(productId);

        if (!product) {
            throw new ForbiddenException('invalid product id');
        }

        (product.reviews[product.reviewCount] as {
            userId: string | number;
            name: string;
            comment: string;
            rating: number;
        }) = {
            userId,
            name: user.fullName,
            comment: dto.comment,
            rating: +dto.rating || 0,
        };

        product.averageRating =
            (product.averageRating * product.reviewCount + dto.rating) / (product.reviewCount + 1);

        product.reviewCount++;

        await product.save();

        return 'product review added successfully';
    }

    async deleteReview(
        userId: number | string,
        productId: string | number,
        reviewId: string | number
    ): Promise<string> {
        const user = await this.userModel.findById(userId, { password: 0, refreshToken: 0 });

        if (!user) {
            throw new ForbiddenException('invalid user');
        }

        const product = await this.productModel.findById(productId);

        if (!product) {
            throw new ForbiddenException('invalid product id');
        }

        const reviewIndex = product.reviews.findIndex(
            (r) => (r as any)._id.toString() === reviewId
        );

        if (reviewIndex == -1) {
            throw new ForbiddenException('invalid review id');
        }

        const [review] = product.reviews.splice(reviewIndex, 1);

        if (review.userId !== userId) {
            throw new ForbiddenException('the user is not author of this review');
        }

        product.averageRating =
            (product.averageRating * product.reviewCount - review.rating) /
            (product.reviewCount - 1);

        product.reviewCount--;

        await product.save();

        return 'product review deleted successfully';
    }

    async addDetails(productId: string | number, dto: DetailsDto): Promise<string> {
        const product = await this.productModel.findById(productId);

        if (!product) {
            throw new ForbiddenException('invalid product id');
        }

        product.details[product.details.length] = {
            title: dto.title,
            description: dto.description,
        };

        await product.save();

        return 'details added successfully';
    }

    async deleteDetails(productId: string | number, detailsId: string | number): Promise<string> {
        const product = await this.productModel.findById(productId);

        if (!product) {
            throw new ForbiddenException('invalid product id');
        }

        const detailsIndex = product.details.findIndex(
            (d) => (d as any)._id.toString() === detailsId
        );

        if (detailsIndex == -1) {
            throw new ForbiddenException('invalid details id');
        }

        product.details.splice(detailsIndex, 1);

        await product.save();

        return 'details deleted successfully';
    }

    async addInformation(productId: string | number, dto: InformationDto): Promise<string> {
        const product = await this.productModel.findById(productId);

        if (!product) {
            throw new ForbiddenException('invalid product id');
        }

        product.information[product.information.length] = {
            title: dto.title,
            description: dto.description,
        };

        await product.save();

        return 'information added successfully';
    }

    async deleteInformation(
        productId: string | number,
        informationId: string | number
    ): Promise<string> {
        const product = await this.productModel.findById(productId);

        if (!product) {
            throw new ForbiddenException('invalid product id');
        }

        const informationIndex = product.information.findIndex(
            (i) => (i as any)._id.toString() === informationId
        );

        if (informationIndex == -1) {
            throw new ForbiddenException('invalid information id');
        }

        product.information.splice(informationIndex, 1);

        await product.save();

        return 'information deleted successfully';
    }
}
