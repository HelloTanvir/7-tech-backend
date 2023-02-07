import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DetailsDto {
    @ApiProperty({ example: 'Warranty', description: 'Title of the detail' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: '2 years of warranty', description: 'Description of the detail' })
    @IsNotEmpty()
    @IsString()
    description: string;
}
