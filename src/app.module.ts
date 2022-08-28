import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { AtGuard } from './common/guards';
import { MongooseConfigService } from './mongoose/mongoose-config.service';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'api-docs'),
        }),
        AuthModule,
        CategoryModule,
        ProductModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
    ],
})
export class AppModule {}
