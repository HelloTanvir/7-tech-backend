import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type BannerDocument = Banner & Document;

@Schema({ timestamps: true })
export class Banner {
    @ApiProperty({ type: [String] })
    @Prop({ type: [String], required: [true, 'Banner images are required'] })
    images: string[];

    @ApiProperty({ type: [String] })
    @Prop({ type: [String], required: [true, 'Banner image keys are required'] })
    keys: string[];
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
