import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
    @ApiProperty({ example: 'tanvir.hossain@aivalabs.com', description: 'Email of the user' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
