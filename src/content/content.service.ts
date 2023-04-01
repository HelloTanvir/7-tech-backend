import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AboutCreateDto, PrivacyCreateDto, TermsCreateDto, TermsUpdateDto } from './dto';
import { About, Content, ContentDocument, Privacy, Terms } from './schema';

@Injectable()
export class ContentService {
    constructor(@InjectModel(Content.name) private readonly contentModel: Model<ContentDocument>) {}
    async createTerms(termsCreateDto: TermsCreateDto): Promise<Terms> {
        const terms = await this.createContentElementItems('terms', termsCreateDto);
        return terms;
    }

    async findTerms(): Promise<Content['terms']> {
        const terms = await this.findContentElement('terms');
        return terms;
    }

    async findTerm(termsId: string): Promise<Terms> {
        const term = await this.findContentElementItems('terms', termsId);
        return term;
    }

    async updateTerm(termsId: string, termsUpdateDto: TermsUpdateDto): Promise<Terms> {
        const term = await this.updateContentElementItems('terms', termsId, termsUpdateDto);
        return term;
    }

    async deleteTerm(termsId: string): Promise<Terms> {
        const term = await this.deleteContentElementItems('terms', termsId);
        return term;
    }

    async findContentElement(
        type: 'terms' | 'privacy' | 'about'
    ): Promise<Content['terms'] | Content['privacy'] | Content['about']> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new ForbiddenException('Content not found');
        }

        return content[type];
    }

    async findContentElementItems(
        type: 'terms' | 'privacy' | 'about',
        itemId: string
    ): Promise<Terms | Privacy | About> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new ForbiddenException('Content not found');
        }

        const item = content[type].find((t) => (t as any)._id == itemId);

        if (!item) {
            throw new ForbiddenException(`${type} with ${itemId} not found`);
        }

        return item;
    }

    async createContentElementItems(
        type: 'terms' | 'privacy' | 'about',
        dto: TermsCreateDto | PrivacyCreateDto | AboutCreateDto
    ): Promise<Terms | Privacy | About> {
        const content = await this.contentModel.findOne();

        if (!content) {
            const newContent = new this.contentModel();
            newContent[type].push(dto);
            await newContent.save();
            return newContent[type][0];
        }

        content[type].push(dto);
        await content.save();
        return content[type][content[type].length - 1];
    }

    async updateContentElementItems(
        type: 'terms' | 'privacy' | 'about',
        itemId: string,
        dto: TermsCreateDto | PrivacyCreateDto | AboutCreateDto
    ): Promise<Terms | Privacy | About> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new ForbiddenException('Content not found');
        }

        const item = content[type].find((t) => (t as any)._id == itemId);

        if (!item) {
            throw new ForbiddenException(`${type} with ${itemId} not found`);
        }

        const index = content[type].indexOf(item);
        content[type][index] = { ...item, ...dto };
        await content.save();

        return content[type][index];
    }

    async deleteContentElementItems(
        type: 'terms' | 'privacy' | 'about',
        itemId: string
    ): Promise<Terms | Privacy | About> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new ForbiddenException('Content not found');
        }

        const item = content[type].find((t) => (t as any)._id == itemId);

        if (!item) {
            throw new ForbiddenException(`${type} with ${itemId} not found`);
        }

        const index = content[type].indexOf(item);
        content[type].splice(index, 1);
        await content.save();

        return item;
    }
}
