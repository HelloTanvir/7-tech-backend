import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { SubCategory, SubCategorySchema } from './sub-category.schema';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
    @ApiProperty()
    @Prop({ required: [true, 'Category name is required'] })
    name: string;

    @ApiProperty({ type: [SubCategory] })
    @Prop({
        type: [SubCategorySchema],
        default: [],
    })
    subCategories: SubCategory[];

    @ApiProperty()
    @Prop({ default: false })
    isFeatured: boolean;

    @ApiProperty()
    @Prop({ default: '' })
    tagline: string;

    @ApiProperty()
    @Prop({ required: [true, 'Category index is required'] })
    index: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
