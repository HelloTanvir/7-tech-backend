import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type ProductDocument = Product & Document;

class Variants {
    @Prop({
        type: SchemaTypes.String,
        required: [true, 'Variant size is required'],
    })
    size: string;

    @Prop({
        type: SchemaTypes.String,
        required: [true, 'Variant color is required'],
    })
    color: string;

    @Prop({
        type: SchemaTypes.Number,
        required: [true, 'Variant stock is required'],
        min: [0, 'Variant stock must be greater than 0'],
    })
    stock: number;
}

@Schema({ timestamps: true })
export class Product {
    @Prop({ type: SchemaTypes.String, required: [true, 'Product name is required'] })
    name: string;

    @Prop({ type: [SchemaTypes.String], required: [true, 'Product images are required'] })
    images: string[];

    @Prop({ type: [SchemaTypes.String], required: [true, 'Product image keys are required'] })
    keys: string[];

    @Prop({ type: SchemaTypes.String, required: [true, 'Product code is required'], unique: true })
    code: string;

    @Prop({ type: SchemaTypes.String, required: [true, 'Product category is required'] })
    category: string;

    @Prop({
        type: SchemaTypes.Number,
        required: [true, 'Product buying price is required'],
        min: [0, 'Product buying price must be greater than 0'],
    })
    buyingPrice: number;

    @Prop({
        type: SchemaTypes.Number,
        required: [true, 'Product selling price is required'],
        min: [0, 'Product selling price must be greater than 0'],
    })
    sellingPrice: number;

    @Prop({
        type: SchemaTypes.Number,
        required: [true, 'Product stock is required'],
        min: [0, 'Product stock must be greater than 0'],
    })
    stock: number;

    @Prop({ type: SchemaTypes.String, required: [true, 'Product description is required'] })
    description: string;

    // variant details
    @Prop({ type: [typeof Variants], required: [true, 'Variant details are required'] })
    variants: Variants[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
