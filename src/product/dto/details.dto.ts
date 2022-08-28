import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DetailsDto {
    @ApiProperty({ example: '2 years of warranty', description: 'Title of the detail' })
    @IsNotEmpty()
    @IsString()
    title: string;
}
