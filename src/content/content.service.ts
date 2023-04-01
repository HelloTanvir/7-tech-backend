import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TermsCreateDto, TermsUpdateDto } from './dto';
import { Content, ContentDocument, Terms } from './schema';

@Injectable()
export class ContentService {
    constructor(@InjectModel(Content.name) private readonly contentModel: Model<ContentDocument>) {}
    async createTerms(termsCreateDto: TermsCreateDto): Promise<Terms> {
        const content = await this.contentModel.findOne();

        if (!content) {
            const newContent = new this.contentModel();
            newContent.terms.push(termsCreateDto);
            await newContent.save();

            return newContent.terms[0];
        }

        content.terms.push(termsCreateDto);
        await content.save();

        return content.terms[content.terms.length - 1];
    }

    async findTerms(): Promise<Content['terms']> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new ForbiddenException('Content not found');
        }

        return content.terms;
    }

    async findTerm(termsId: string): Promise<Terms> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new ForbiddenException('Content not found');
        }

        const term = content.terms.find((t) => (t as any)._id == termsId);

        if (!term) {
            throw new ForbiddenException('Term not found');
        }

        return term;
    }

    async updateTerm(termsId: string, termsUpdateDto: TermsUpdateDto): Promise<Terms> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new ForbiddenException('Content not found');
        }

        const term = content.terms.find((t) => (t as any)._id == termsId);

        if (!term) {
            throw new ForbiddenException('Term not found');
        }

        const index = content.terms.indexOf(term);
        content.terms[index] = { ...term, ...termsUpdateDto };
        await content.save();

        return content.terms[index];
    }

    async deleteTerm(termsId: string): Promise<Terms> {
        const content = await this.contentModel.findOne();

        if (!content) {
            throw new ForbiddenException('Content not found');
        }

        const term = content.terms.find((t) => (t as any)._id == termsId);

        if (!term) {
            throw new ForbiddenException('Term not found');
        }

        const index = content.terms.indexOf(term);
        content.terms.splice(index, 1);
        await content.save();

        return term;
    }
}
