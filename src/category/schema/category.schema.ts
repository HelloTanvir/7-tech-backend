import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SubCategory } from './sub-category.schema';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
    @Prop({ required: [true, 'Category name is required'], unique: true })
    name: string;

    @Prop({
        type: [SubCategory],
        default: [],
    })
    subCategories: SubCategory[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
