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
    isFeatured?: boolean;

    @ApiProperty({ example: false, description: 'Should the category shown on the header?' })
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    show?: boolean;

    @ApiProperty({ example: 'Made For Gaming', description: 'tagline of the category' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    tagline?: string;

    @ApiProperty({ example: 1, description: 'Index of the category' })
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    index?: number;
}
