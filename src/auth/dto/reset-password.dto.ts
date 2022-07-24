import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
