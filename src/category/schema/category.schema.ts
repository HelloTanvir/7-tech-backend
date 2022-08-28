import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { SubCategory, SubCategorySchema } from './sub-category.schema';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
    @ApiProperty()
    @Prop({ required: [true, 'Category name is required'], unique: true })
    name: string;

    @ApiProperty({ type: [SubCategory] })
    @Prop({
        type: [SubCategorySchema],
        default: [],
    })
    subCategories: SubCategory[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
