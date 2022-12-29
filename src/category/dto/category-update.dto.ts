import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryUpdateDto {
    @ApiProperty({ example: 'Laptop', description: 'Title of the category', required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;
}
