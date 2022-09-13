import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/schema';
import { Category, CategorySchema } from '../category/schema';
import { StorageService } from '../utils';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Category.name, schema: CategorySchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService, StorageService],
})
export class ProductModule {}
