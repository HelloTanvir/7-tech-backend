import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Terms {
    @ApiProperty()
    @Prop({ enum: ['disclaimer', 'payment terms'], default: 'disclaimer' })
    title: string;

    @ApiProperty()
    @Prop({ default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' })
    description: string;
}

export const TermsSchema = SchemaFactory.createForClass(Terms);
