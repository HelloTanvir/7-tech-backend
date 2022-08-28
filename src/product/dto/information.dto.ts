import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InformationDto {
    @ApiProperty({ example: 'RAM', description: 'Title of the information' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: '64 GB', description: 'Description of the information' })
    @IsNotEmpty()
    @IsString()
    description: string;
}
