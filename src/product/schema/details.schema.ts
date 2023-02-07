import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Detail {
    @Prop({ required: [true, 'Product detail title is required'] })
    title: string;

    @Prop({ required: [true, 'Product detail description is required'] })
    description: string;
}

export const DetailSchema = SchemaFactory.createForClass(Detail);
