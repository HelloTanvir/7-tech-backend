import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class ProductInfo {
    @ApiProperty()
    @Prop({ required: [true, 'Product id is required'] })
    productId: string;

    @ApiProperty()
    @Prop({
        required: [true, 'Product quantity is required'],
        min: [1, 'Product quantity must be greater than 0'],
    })
    quantity: number;
}

export const ProductInfoSchema = SchemaFactory.createForClass(ProductInfo);
