import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Information {
    @Prop({ required: [true, 'Product info title is required'] })
    title: string;

    @Prop({ required: [true, 'Product info description is required'] })
    description: string;
}
