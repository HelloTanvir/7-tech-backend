import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SubCategory {
    @Prop({ required: [true, 'Category name is required'], unique: true })
    name: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
