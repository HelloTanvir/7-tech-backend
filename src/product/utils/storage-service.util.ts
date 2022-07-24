import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { extname } from 'path';

@Injectable()
export class StorageService {
    constructor(private configService: ConfigService) {}

    async uploadFile(file: Express.Multer.File): Promise<{ location: string; key: string }> {
        const s3 = this.getS3();

        const fileExt = extname(file.originalname);
        const fileName =
            file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-') +
            '-' +
            Date.now();

        const params = {
            Bucket: this.configService.get('AWS_S3_BUCKET'),
            Key: fileName + fileExt,
            Body: file.buffer,
        };

        const uploaded = await s3.upload(params).promise();

        return {
            location: uploaded.Location,
            key: uploaded.Key,
        };
    }

    async deleteFile(filePath: string): Promise<void> {
        const s3 = this.getS3();

        const params = {
            Bucket: this.configService.get('AWS_S3_BUCKET'),
            Key: filePath,
        };

        await s3.deleteObject(params).promise();
    }

    getS3(): S3 {
        return new S3({
            accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
            region: this.configService.get('AWS_S3_REGION'),
        });
    }
}
