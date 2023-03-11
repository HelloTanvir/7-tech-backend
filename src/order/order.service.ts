import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../product/schema';
import { OrderDto, OrderUpdateDto } from './dto';
import { Order, OrderDocument } from './schema';
import { AllOrdersResponse } from './types';

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

            // if product quantity is less than the quantity in the cart, throw an error
            if (savedProduct.quantity < product.quantity) {
                throw new ForbiddenException(
                    `product ${product.productId} quantity is not enough, only ${savedProduct.quantity} left`
                );
            }

            // decrease the quantity of the product
            savedProduct.quantity -= product.quantity;
            await savedProduct.save();

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

    async findAll(page: number, size: number, searchQuery: string): Promise<AllOrdersResponse> {
        if (searchQuery) {
            const orders = await this.orderModel
                .find({
                    $or: [
                        { customer_name: { $regex: searchQuery, $options: 'i' } },
                        { customer_number: { $regex: searchQuery, $options: 'i' } },
                        { address: { $regex: searchQuery, $options: 'i' } },
                        { city: { $regex: searchQuery, $options: 'i' } },
                        { zone: { $regex: searchQuery, $options: 'i' } },
                        { payment_method: { $regex: searchQuery, $options: 'i' } },
                        { status: { $regex: searchQuery, $options: 'i' } },
                        { total: { $regex: searchQuery, $options: 'i' } },
                    ],
                })
                .limit(size)
                .skip((page - 1) * size);

            const count = await this.orderModel.countDocuments({
                $or: [
                    { customer_name: { $regex: searchQuery, $options: 'i' } },
                    { customer_number: { $regex: searchQuery, $options: 'i' } },
                    { address: { $regex: searchQuery, $options: 'i' } },
                    { city: { $regex: searchQuery, $options: 'i' } },
                    { zone: { $regex: searchQuery, $options: 'i' } },
                    { payment_method: { $regex: searchQuery, $options: 'i' } },
                    { status: { $regex: searchQuery, $options: 'i' } },
                    { total: { $regex: searchQuery, $options: 'i' } },
                ],
            });

            return { count, orders };
        }

        const orders = await this.orderModel
            .find()
            .limit(size)
            .skip((page - 1) * size);

        const count = await this.orderModel.countDocuments();

        return { count, orders };
    }

    async findOne(id: string | number): Promise<Order> {
        const order = (await this.orderModel.findById(id)).toObject();

        // populate products
        const products: Product[] = [];
        for (const product of order.products) {
            const orderedProduct = await this.productModel.findById(product.productId);
            if (orderedProduct) {
                products.push(orderedProduct);
            }
        }

        (order.products as unknown as Product[]) = products;

        return order as unknown as Order;
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
