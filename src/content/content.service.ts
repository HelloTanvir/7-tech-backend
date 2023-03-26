import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContentDto, UpdateTermsDto } from './dto';
import { Content, ContentDocument } from './schema';

@Injectable()
export class ContentService {
    constructor(@InjectModel(Content.name) private readonly contentModel: Model<ContentDocument>) {}
    async create(createContentDto: CreateContentDto): Promise<Content> {
        const isContentExist = await this.contentModel.countDocuments();

        if (isContentExist) {
            throw new Error('Content already exists');
        }

        const newContent = new this.contentModel(createContentDto);
        await newContent.save();

        return newContent;
    }

    async find(contentType: string): Promise<Content> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new Error('Content not found');
        }

        if (contentType) {
            return content[contentType];
        }

        return content;
    }

    async updateTerms(updateTermsDto: UpdateTermsDto): Promise<Content['terms']> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new Error('Content not found');
        }

        content.terms = updateTermsDto.terms;
        await content.save();

        return content.terms;
    }

    async remove(): Promise<string> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new Error('Content not found');
        }

        await content.remove();

        return 'Content deleted successfully';
    }
}
