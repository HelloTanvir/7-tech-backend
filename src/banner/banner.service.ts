import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StorageService } from '../utils';
import { Banner, BannerDocument } from './schema';

@Injectable()
export class BannerService {
    constructor(
        @InjectModel(Banner.name) private readonly bannerModel: Model<BannerDocument>,
        private readonly storageService: StorageService
    ) {}

    async create(images: Express.Multer.File[]): Promise<Banner> {
        if (!images.length) {
            throw new ForbiddenException('Banner images are required');
        }

        // upload images
        const imagePaths: string[] = [];
        const keys: string[] = [];

        for (const image of images) {
            const { location, key } = await this.storageService.uploadFile(image);
            imagePaths.push(location);
            keys.push(key);
        }

        const banner = new this.bannerModel({
            images: imagePaths,
            keys,
        });

        await banner.save();

        return banner;
    }

    async findAll(): Promise<Banner[]> {
        return await this.bannerModel.find();
    }

    async delete(id: string | number): Promise<Banner> {
        const banner = await this.bannerModel.findById(id);
        if (!banner) {
            throw new ForbiddenException('banner does not exist');
        }

        // delete images
        for (const key of banner.keys) {
            await this.storageService.deleteFile(key);
        }

        // delete banner
        await banner.remove();

        return banner;
    }
}
