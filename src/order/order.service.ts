import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from './dto';
import { Order, OrderDocument } from './schema';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>) {}

    async create(dto: OrderDto): Promise<Order> {
        const order = new this.orderModel(dto);
        await order.save();

        return order;
    }

    async findAll(): Promise<Order[]> {
        return await this.orderModel.find();
    }

    async findOne(id: string | number): Promise<Order> {
        return await this.orderModel.findById(id);
    }
}
