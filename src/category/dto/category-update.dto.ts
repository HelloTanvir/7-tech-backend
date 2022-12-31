import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryUpdateDto {
    @ApiProperty({ example: 'Laptop', description: 'Title of the category', required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;

    @ApiProperty({ example: false, description: 'Is the category featured?' })
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isFeatured: boolean;

    @ApiProperty({ example: 1, description: 'Index of the category' })
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    index: number;
}
