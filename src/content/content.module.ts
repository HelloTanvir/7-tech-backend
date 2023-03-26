import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { Content, ContentSchema } from './schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }])],
    controllers: [ContentController],
    providers: [ContentService],
})
export class ContentModule {}
