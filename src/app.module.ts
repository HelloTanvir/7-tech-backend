import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BannerModule } from './banner/banner.module';
import { CategoryModule } from './category/category.module';
import { AtGuard } from './common/guards';
import { MongooseConfigService } from './mongoose/mongoose-config.service';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { MongoExceptionFilter } from './utils';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
        }),
        AuthModule,
        CategoryModule,
        ProductModule,
        OrderModule,
        BannerModule,
        UserModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
        {
            provide: APP_PIPE,
            useClass: MongoExceptionFilter,
        },
    ],
})
export class AppModule {}
