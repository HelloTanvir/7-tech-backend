import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { ProductInfo, ProductInfoSchema } from './product-info.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @ApiProperty()
    @Prop({ required: [true, 'Customer name is required'] })
    customer_name: string;

    @ApiProperty()
    @Prop({ required: [true, 'Customer mobile number is required'] })
    customer_number: string;

    @ApiProperty({ type: [ProductInfo] })
    @Prop({
        type: [ProductInfoSchema],
        default: [],
    })
    products: ProductInfo[];

    // delivery details
    @ApiProperty()
    @Prop({ required: [true, 'Customer address is required'] })
    address: string;

    @ApiProperty()
    @Prop({ required: [true, 'Customer city is required'] })
    city: string;

    @ApiProperty()
    @Prop({ required: [true, 'Customer zone is required'] })
    zone: string;

    @ApiProperty()
    @Prop({ required: [true, 'Payment method is required'] })
    payment_method: string;

    // status
    @Prop({ default: 'pending' })
    status: string;

    // cart total
    @Prop({ required: [true, 'Cart total is required'] })
    total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
