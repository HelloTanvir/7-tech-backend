import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
    @ApiProperty({ example: 'Tanvir Hossain', description: 'Full name of the user' })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ example: 'tanvir.hossain@aivalabs.com', description: 'Email of the user' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '01521572755', description: 'Phone number of the user' })
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty({ example: 'moneyIsMyLove', description: 'Password of the user' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
