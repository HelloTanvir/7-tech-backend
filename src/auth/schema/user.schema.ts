import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: SchemaTypes.String, required: [true, 'User name is required'] })
    fullName: string;

    @Prop({
        type: SchemaTypes.String,
        required: [true, 'User email address is required'],
        unique: true,
    })
    email: string;

    @Prop({ type: SchemaTypes.String, required: [true, 'User phone number is required'] })
    phoneNumber: string;

    @Prop({ type: SchemaTypes.String, required: [true, 'User password is required'] })
    password: string;

    @Prop({ type: SchemaTypes.String, default: null })
    refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
