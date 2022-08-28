import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private config: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: this.config.get('MONGO_URL'),
            // uri: this.config.get('MONGO_URL_DEV'),
        };
    }
}
