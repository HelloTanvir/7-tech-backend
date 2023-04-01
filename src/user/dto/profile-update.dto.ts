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

    @ApiProperty({ example: 'Section-2, Mirpur, Dhaka', description: 'Address of the user' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ example: 'Dhaka', description: 'City of the user' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ example: '1250', description: 'Zone of the user' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    zone: string;
}
