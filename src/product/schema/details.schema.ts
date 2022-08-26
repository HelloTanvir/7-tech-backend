import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Detail {
    @Prop({ required: [true, 'Product detail is required'] })
    title: string;
}
