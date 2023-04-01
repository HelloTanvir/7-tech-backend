import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Terms {
    @ApiProperty()
    @Prop()
    title: string;

    @ApiProperty()
    @Prop()
    description: string;
}

export const TermsSchema = SchemaFactory.createForClass(Terms);
