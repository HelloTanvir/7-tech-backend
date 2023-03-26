import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class About {
    @ApiProperty()
    @Prop({ enum: ['introduction', 'objective', 'partners & affiliates'], default: 'disclaimer' })
    title: string;

    @ApiProperty()
    @Prop({ default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' })
    description: string;

    @ApiProperty({
        type: [String],
        // example: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.'],
        example: ['test.'],
    })
    @Prop({ type: [String], default: [] })
    topics: string[];
}

export const AboutSchema = SchemaFactory.createForClass(About);
