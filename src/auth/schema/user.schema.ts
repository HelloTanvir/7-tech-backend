import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Document, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @ApiProperty()
    @Prop({ default: false })
    isAdmin: boolean;

    @ApiProperty()
    @Prop({ required: [true, 'User name is required'] })
    fullName: string;

    @ApiProperty()
    @Prop({
        required: [true, 'User email address is required'],
        unique: true,
    })
    email: string;

    @ApiProperty()
    @Prop({ required: [true, 'User phone number is required'] })
    phoneNumber: string;

    @Prop({ required: [true, 'User password is required'] })
    password: string;

    @ApiProperty()
    @Prop({ default: '' })
    address: string;

    @ApiProperty()
    @Prop({ default: '' })
    city: string;

    @ApiProperty()
    @Prop({ default: '' })
    zone: string;

    @ApiProperty()
    @Prop({ type: SchemaTypes.String, default: null })
    refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
