import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'tanvir.hossain@aivalabs.com', description: 'Email of the user' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'moneyIsMyLove', description: 'Password of the user' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
