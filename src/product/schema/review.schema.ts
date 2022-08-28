import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Review {
    @ApiProperty()
    @Prop({ required: [true, 'Reviewer name is required'] })
    userId: string;

    @ApiProperty()
    @Prop({ required: [true, 'Reviewer name is required'] })
    name: string;

    @ApiProperty()
    @Prop({ default: Date.now })
    date: string;

    @ApiProperty()
    @Prop({ required: [true, 'Comment is required'] })
    comment: string;

    @ApiProperty()
    @Prop({
        required: [true, 'Product rating is required'],
        min: [0, 'Product rating must be greater than or equal 0'],
    })
    rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
