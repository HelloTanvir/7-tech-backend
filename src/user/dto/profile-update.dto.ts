import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProfileUpdateDto {
    @ApiProperty({ example: 'Tanvir Hossain', description: 'Full name of the user' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ example: 'tanvir.hossain@aivalabs.com', description: 'Email of the user' })
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '01521572755', description: 'Phone number of the user' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
}
