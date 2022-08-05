import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../category/schema';
import { ProductDto, ProductUpdateDto } from './dto';
import { Product, ProductDocument } from './schema';
import { StorageService } from './utils';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
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
        await category.save();

        return newProduct;
    }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find();
    }

    async findOne(id: string | number): Promise<Product> {
        return await this.productModel.findById(id);
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
}
