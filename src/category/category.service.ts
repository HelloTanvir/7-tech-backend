import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto, CategoryUpdateDto } from './dto';
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
}
