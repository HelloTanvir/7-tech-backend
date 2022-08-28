import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubCategoryDto {
    @ApiProperty({ example: 'Macbook', description: 'Title of the sub-category' })
    @IsNotEmpty()
    @IsString()
    name: string;
}
