import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Privacy {
    @ApiProperty()
    @Prop({ default: 'information collection and use' })
    title: string;

    @ApiProperty()
    @Prop({ default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' })
    description: string;
}

export const PrivacySchema = SchemaFactory.createForClass(Privacy);
