import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../product/schema';
import { OrderDto, OrderUpdateDto } from './dto';
import { Order, OrderDocument } from './schema';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) {}

    async create(dto: OrderDto): Promise<Order> {
        // cart total
        let total = 0;

        for (const product of dto.products) {
            const savedProduct = await this.productModel.findById(product.productId);

            if (!savedProduct) {
                throw new ForbiddenException(`invalid product id: ${product.productId}`);
            }

            const individualCart = {
                // default price is the regular price
                productPrice: savedProduct.regularPrice,
                productQuantity: product.quantity,
            };

            // if product has a discount, use the discounted price
            if (savedProduct.offerPrice && savedProduct.offerEndDate > Date.now().toString()) {
                individualCart.productPrice = savedProduct.offerPrice;
            }

            // if product has an online price, use the online price
            if (dto.payment_method === 'online' && savedProduct.onlinePrice) {
                individualCart.productPrice = savedProduct.onlinePrice;
            }

            total += individualCart.productPrice * individualCart.productQuantity;
        }

        const order = new this.orderModel({
            ...dto,
            total,
        });

        await order.save();

        return order;
    }

    async findAll(): Promise<Order[]> {
        return await this.orderModel.find();
    }

    async findOne(id: string | number): Promise<Order> {
        return await this.orderModel.findById(id);
    }

    async update(id: string | number, dto: OrderUpdateDto): Promise<Order> {
        const order = await this.orderModel.findById(id);
        if (!order) {
            throw new ForbiddenException('order does not exist');
        }

        order.status = dto.status;

        await order.save();

        return order;
    }

    async delete(id: string | number): Promise<Order> {
        const order = await this.orderModel.findById(id);
        if (!order) {
            throw new ForbiddenException('order does not exist');
        }

        await order.remove();

        return order;
    }
}
