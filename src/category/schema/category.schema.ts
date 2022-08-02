import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type CategoryDocument = Category & Document;

class SubCategory {
    @Prop({ type: SchemaTypes.String, required: [true, 'Category name is required'], unique: true })
    name: string;
}

@Schema({ timestamps: true })
export class Category {
    @Prop({ type: SchemaTypes.String, required: [true, 'Category name is required'], unique: true })
    name: string;

    @Prop({
        type: [typeof SubCategory],
        default: [],
    })
    subCategories: SubCategory[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
