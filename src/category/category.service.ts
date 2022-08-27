import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto, CategoryUpdateDto, SubCategoryDto } from './dto';
import { Category, CategoryDocument } from './schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>
    ) {}

    async create(dto: CategoryDto): Promise<Category> {
        const category = await this.categoryModel.findOne({ name: dto.name });
        if (category) {
            throw new ForbiddenException('category already exists');
        }

        const newCategory = new this.categoryModel(dto);
        await newCategory.save();

        return newCategory;
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryModel.find();
    }

    async findOne(id: string | number): Promise<Category> {
        return await this.categoryModel.findById(id);
    }

    async update(id: string | number, dto: CategoryUpdateDto): Promise<Category> {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new ForbiddenException('category does not exist');
        }

        return await this.categoryModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async delete(id: string | number): Promise<Category> {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new ForbiddenException('category does not exist');
        }

        await category.remove();

        return category;
    }

    async addSubCategory(categoryId: string | number, dto: SubCategoryDto): Promise<Category> {
        const category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new ForbiddenException('category does not exist');
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
            throw new ForbiddenException('sub category does not exist');
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

        category.subCategories = category.subCategories.filter(
            (subCategory) =>
                (subCategory as { _id: string; name: string })._id.toString() !== subCategoryId
        );

        await category.save();

        return category;
    }
}
