import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../product/schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
