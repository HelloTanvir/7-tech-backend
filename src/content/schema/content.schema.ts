import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { About, AboutSchema } from './about.schema';
import { Privacy, PrivacySchema } from './privacy.schema';
import { Terms, TermsSchema } from './terms.schema';

export type ContentDocument = Content & Document;

@Schema({ timestamps: true })
export class Content {
    @ApiProperty({ type: [Terms] })
    @Prop({
        type: [TermsSchema],
        default: [],
    })
    terms: Terms[];

    @ApiProperty({ type: [Privacy] })
    @Prop({
        type: [PrivacySchema],
        default: [],
    })
    privacy: Privacy[];

    @ApiProperty({ type: [About] })
    @Prop({
        type: [AboutSchema],
        default: [],
    })
    about: About[];
}

export const ContentSchema = SchemaFactory.createForClass(Content);
