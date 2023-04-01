import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class About {
    @ApiProperty()
    @Prop()
    title: string;

    @ApiProperty()
    @Prop()
    description: string;
}

export const AboutSchema = SchemaFactory.createForClass(About);
