import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    // eslint-disable-next-line prettier/prettier
    ValidateNested
} from 'class-validator';

class SubCategory {
    @ApiProperty({ example: 'Macbook', description: 'Title of the sub-category' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class CategoryDto {
    @ApiProperty({ example: 'Laptop', description: 'Title of the category' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: [SubCategory] })
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

    @ApiProperty({ example: false, description: 'Is the category featured?' })
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isFeatured: boolean;

    @ApiProperty({ example: 1, description: 'Index of the category' })
    @IsNotEmpty()
    @IsNumber()
    index: number;
}
