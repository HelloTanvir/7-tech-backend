import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

class SubCategory {
    @ApiProperty({ example: 'Macbook', description: 'Title of the sub-category' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class CategoryUpdateDto {
    @ApiProperty({ example: 'Laptop', description: 'Title of the category', required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: [SubCategory], required: false })
    @IsOptional()
    @IsNotEmpty()
    @Transform(
        ({ value }) => {
            if (value && typeof value === 'string') {
                return JSON.parse(value);
            } else if (value && typeof value === 'object') {
                return value;
            }
            return [];
        },
        { toClassOnly: true }
    )
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SubCategory)
    subCategories: SubCategory[];
}
