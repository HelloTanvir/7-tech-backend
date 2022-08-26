import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Detail } from './details.schema';
import { Information } from './information.schema';
import { Review } from './review.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: [true, 'Product name is required'] })
    name: string;

    @Prop({ required: [true, 'Product code is required'], unique: true })
    code: string;

    @Prop({
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be greater than 0'],
    })
    price: number;

    @Prop({
        default: 0,
        min: [0, 'Product rating must be greater than or equal 0'],
    })
    averageRating: number;

    @Prop({
        default: 0,
        min: [0, 'Product review count must be greater than or equal 0'],
    })
    reviewCount: number;

    @Prop({
        required: [true, 'Product quantity is required'],
        min: [0, 'Product quantity must be greater than 0'],
    })
    quantity: number;

    @Prop({ required: [true, 'Product category is required'] })
    category: string;

    @Prop({ type: [String], required: [true, 'Product images are required'] })
    images: string[];

    @Prop({ type: [String], required: [true, 'Product image keys are required'] })
    keys: string[];

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ default: false })
    isFeatured: boolean;

    @Prop({ default: 'Product' })
    imageAlt: string;

    @Prop({ type: [typeof Detail], default: [] })
    details: Detail[];

    @Prop({ type: [typeof Information], default: [] })
    information: Information[];

    @Prop({ type: [typeof Review], default: [] })
    reviews: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
