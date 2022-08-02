import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type ProductDocument = Product & Document;

class Color {
    @Prop({
        type: SchemaTypes.String,
        required: [true, 'Product color is required'],
    })
    name: string;
}

class Detail {
    @Prop({
        type: SchemaTypes.String,
        required: [true, 'Product detail is required'],
    })
    title: string;
}

class Information {
    @Prop({
        type: SchemaTypes.String,
        required: [true, 'Product info title is required'],
    })
    title: string;

    @Prop({
        type: SchemaTypes.String,
        required: [true, 'Product info description is required'],
    })
    description: string;
}

class Review {
    @Prop({
        type: SchemaTypes.String,
        required: [true, 'Reviewer name is required'],
    })
    name: string;

    @Prop({
        type: SchemaTypes.String,
        default: Date.now,
    })
    date: string;

    @Prop({
        type: SchemaTypes.String,
        required: [true, 'Comment is required'],
    })
    comment: string;

    @Prop({
        type: SchemaTypes.Number,
        required: [true, 'Product rating is required'],
        min: [0, 'Product rating must be greater than or equal 0'],
    })
    rating: number;
}

@Schema({ timestamps: true })
export class Product {
    @Prop({ type: SchemaTypes.String, required: [true, 'Product name is required'] })
    name: string;

    @Prop({ type: SchemaTypes.String, required: [true, 'Product code is required'], unique: true })
    code: string;

    @Prop({
        type: SchemaTypes.Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be greater than 0'],
    })
    price: number;

    @Prop({
        type: SchemaTypes.Number,
        required: [true, 'Product rating is required'],
        min: [0, 'Product rating must be greater than or equal 0'],
    })
    rating: number;

    @Prop({
        type: SchemaTypes.Number,
        required: [true, 'Product review count is required'],
        min: [0, 'Product review count must be greater than or equal 0'],
    })
    reviewCount: number;

    @Prop({
        type: SchemaTypes.Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Product quantity must be greater than 0'],
    })
    qty: number;

    @Prop({ type: SchemaTypes.String, required: [true, 'Product brand name is required'] })
    brand: string;

    @Prop({ type: SchemaTypes.String, required: [true, 'Product category is required'] })
    category: string;

    @Prop({ type: [SchemaTypes.String], required: [true, 'Product images are required'] })
    images: string[];

    @Prop({ type: [SchemaTypes.String], required: [true, 'Product image keys are required'] })
    keys: string[];

    @Prop({ type: SchemaTypes.String, default: 'Product' })
    imageAlt: string;

    @Prop({ type: [typeof Color], required: [true, 'Product colors are required'] })
    colors: Color[];

    @Prop({ type: [typeof Detail], required: [true, 'Product details is required'] })
    details: Detail[];

    @Prop({ type: [typeof Information], required: [true, 'Product information is required'] })
    informations: Information[];

    @Prop({ type: [typeof Review], required: [true, 'Product reviews are required'] })
    reviews: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
