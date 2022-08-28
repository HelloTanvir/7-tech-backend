import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Review {
    @Prop({ required: [true, 'Reviewer name is required'] })
    userId: string;

    @Prop({ required: [true, 'Reviewer name is required'] })
    name: string;

    @Prop({ default: Date.now })
    date: string;

    @Prop({ required: [true, 'Comment is required'] })
    comment: string;

    @Prop({
        required: [true, 'Product rating is required'],
        min: [0, 'Product rating must be greater than or equal 0'],
    })
    rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
