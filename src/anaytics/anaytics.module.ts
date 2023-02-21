import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/schema';
import { Category, CategorySchema } from '../category/schema';
import { Order, OrderSchema } from '../order/schema';
import { Product, ProductSchema } from '../product/schema';
import { AnayticsController } from './anaytics.controller';
import { AnayticsService } from './anaytics.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Category.name, schema: CategorySchema },
            { name: User.name, schema: UserSchema },
            { name: Order.name, schema: OrderSchema },
        ]),
    ],
    controllers: [AnayticsController],
    providers: [AnayticsService],
})
export class AnayticsModule {}
