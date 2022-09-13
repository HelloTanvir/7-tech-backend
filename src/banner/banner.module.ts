import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageService } from '../utils';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { Banner, BannerSchema } from './schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }])],
    controllers: [BannerController],
    providers: [BannerService, StorageService],
})
export class BannerModule {}
