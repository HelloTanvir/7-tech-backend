import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @ApiProperty()
    @Prop({ required: [true, 'User id is required'] })
    userId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
