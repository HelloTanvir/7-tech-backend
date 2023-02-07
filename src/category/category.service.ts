import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../product/schema';
import { CategoryDto, CategoryUpdateDto, SubCategoryDto } from './dto';
import { Category, CategoryDocument } from './schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) {}

    async create(dto: CategoryDto): Promise<Category> {
        const category = await this.categoryModel.findOne({ name: dto.name });
        if (category) {
            throw new ForbiddenException('category already exists');
        }

        // remove duplicate sub categories
        dto.subCategories = dto.subCategories.filter(
            (subCategory, index, self) =>
                index === self.findIndex((t) => t.name === subCategory.name)
        );

        // set category name as tagline if tagline is not provided for featured category
        if (dto.isFeatured && !dto.tagline) {
            dto.tagline = dto.name;
        }

        const newCategory = new this.categoryModel(dto);
        await newCategory.save();

        return newCategory;
    }

    async findAll(page: number, size: number): Promise<Category[]> {
        return await this.categoryModel
            .find()
            .limit(size)
            .skip((page - 1) * size);
    }

    async findOne(id: string | number): Promise<Category> {
        return await this.categoryModel.findById(id);
    }

    async update(id: string | number, dto: CategoryUpdateDto): Promise<Category> {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new ForbiddenException('category does not exist');
        }

        if (!dto.name || !dto.isFeatured || !dto.tagline || !dto.index) {
            throw new ForbiddenException('nothing to update');
        }

        // update category of products if category name is changed
        if (dto.name !== category.name) {
            const products = await this.productModel.find({
                category: category.name,
            });

            for (const product of products) {
                product.category = dto.name;
                await product.save();
            }
        }

        return await this.categoryModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async delete(id: string | number): Promise<Category> {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new ForbiddenException('category does not exist');
        }

        // set category of products to unknown
        const products = await this.productModel.find({ category: category.name });

        for (const product of products) {
            product.category = 'unknown';
            product.subCategory = 'unknown';
            await product.save();
        }

        await category.remove();

        return category;
    }

    async addSubCategory(categoryId: string | number, dto: SubCategoryDto): Promise<Category> {
        const category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new ForbiddenException('category does not exist');
        }

        // check if sub category already exists
        const subCategory = category.subCategories.find(
            (subCategory) => subCategory.name === dto.name
        );

        if (subCategory) {
            throw new ForbiddenException('sub category already exists');
        }

        category.subCategories[category.subCategories.length] = {
            name: dto.name,
        };

        await category.save();

        return category;
    }

    async updateSubCategory(
        categoryId: string | number,
        subCategoryId: string | number,
        dto: SubCategoryDto
    ): Promise<Category> {
        const category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new ForbiddenException('category does not exist');
        }

        const indexOfSubCategory = category.subCategories.findIndex(
            (subCategory) =>
                (subCategory as { _id: string; name: string })._id.toString() === subCategoryId
        );

        if (indexOfSubCategory == -1) {
            throw new ForbiddenException('invalid sub category id');
        }

        // check if sub category already exists
        const subCategory = category.subCategories.find(
            (subCategory) => subCategory.name === dto.name
        );

        if (subCategory) {
            throw new ForbiddenException('sub category already exists');
        }

        // update sub category of products
        const products = await this.productModel.find({
            category: category.name,
            subCategory: category.subCategories[indexOfSubCategory].name,
        });

        for (const product of products) {
            product.subCategory = dto.name;
            await product.save();
        }

        category.subCategories[indexOfSubCategory].name = dto.name;

        await category.save();

        return category;
    }

    async deleteSubCategory(
        categoryId: string | number,
        subCategoryId: string | number
    ): Promise<Category> {
        const category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new ForbiddenException('category does not exist');
        }

        const indexOfSubCategory = category.subCategories.findIndex(
            (subCategory) =>
                (subCategory as { _id: string; name: string })._id.toString() === subCategoryId
        );
        if (indexOfSubCategory == -1) {
            throw new ForbiddenException('sub category does not exist');
        }

        // set sub category of products to unknown
        const products = await this.productModel.find({
            category: category.name,
            subCategory: category.subCategories[indexOfSubCategory].name,
        });

        for (const product of products) {
            product.subCategory = 'unknown';
            await product.save();
        }

        category.subCategories = category.subCategories.filter(
            (subCategory) =>
                (subCategory as { _id: string; name: string })._id.toString() !== subCategoryId
        );

        await category.save();

        return category;
    }
}
