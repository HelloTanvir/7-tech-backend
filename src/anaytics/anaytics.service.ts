import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schema';
import { Category, CategoryDocument } from '../category/schema';
import { Order, OrderDocument } from '../order/schema';
import { Product, ProductDocument } from '../product/schema';
import { AllAnalyticsResponse } from './types';

@Injectable()
export class AnayticsService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {}

    async findAll(): Promise<AllAnalyticsResponse> {
        const totalProducts = await this.productModel.countDocuments();
        const totalOutOfStockProducts = await this.productModel.countDocuments({ inStock: false });
        const totalCategories = await this.categoryModel.countDocuments();
        const totalOrders = await this.orderModel.countDocuments();
        const totalUsers = await this.userModel.countDocuments();

        return {
            totalProducts,
            totalOutOfStockProducts,
            totalCategories,
            totalOrders,
            totalUsers,
        };
    }
}
