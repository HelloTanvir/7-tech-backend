import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Detail, DetailSchema } from './details.schema';
import { Information, InformationSchema } from './information.schema';
import { Review, ReviewSchema } from './review.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @ApiProperty()
    @Prop({ required: [true, 'Product name is required'] })
    name: string;

    @ApiProperty()
    @Prop({ required: [true, 'Product code is required'], unique: true })
    code: string;

    @ApiProperty()
    @Prop({
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be greater than 0'],
    })
    price: number;

    @ApiProperty()
    @Prop({
        default: 0,
        min: [0, 'Product rating must be greater than or equal 0'],
    })
    averageRating: number;

    @ApiProperty()
    @Prop({
        default: 0,
        min: [0, 'Product review count must be greater than or equal 0'],
    })
    reviewCount: number;

    @ApiProperty()
    @Prop({
        required: [true, 'Product quantity is required'],
        min: [0, 'Product quantity must be greater than 0'],
    })
    quantity: number;

    @ApiProperty()
    @Prop({ required: [true, 'Product category is required'] })
    category: string;

    @ApiProperty()
    @Prop()
    subCategory?: string;

    @ApiProperty({ type: [String] })
    @Prop({ type: [String], required: [true, 'Product images are required'] })
    images: string[];

    @ApiProperty({ type: [String] })
    @Prop({ type: [String], required: [true, 'Product image keys are required'] })
    keys: string[];

    @ApiProperty({ type: [String] })
    @Prop({ type: [String], default: [] })
    tags: string[];

    @ApiProperty()
    @Prop({ default: false })
    isFeatured: boolean;

    @ApiProperty()
    @Prop({ default: 'Product' })
    imageAlt: string;

    @ApiProperty()
    @Prop({ default: '' })
    shortDescription: string;

    @ApiProperty({ type: [Detail] })
    @Prop({ type: [DetailSchema], default: [] })
    details: Detail[];

    @ApiProperty({ type: [Information] })
    @Prop({ type: [InformationSchema], default: [] })
    information: Information[];

    @ApiProperty({ type: [Review] })
    @Prop({ type: [ReviewSchema], default: [] })
    reviews: Review[];

    @ApiProperty({ type: [String] })
    @Prop({ type: [String], default: [] })
    relatedProducts: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
