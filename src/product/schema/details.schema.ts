import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Detail {
    @Prop({ required: [true, 'Product detail is required'] })
    title: string;
}

export const DetailSchema = SchemaFactory.createForClass(Detail);
