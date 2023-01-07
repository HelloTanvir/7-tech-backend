import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    // eslint-disable-next-line prettier/prettier
    IsString
} from 'class-validator';

class Detail {
    @ApiProperty({ example: '2 years of warranty', description: 'Title of the detail' })
    @IsNotEmpty()
    @IsString()
    title: string;
}

class Information {
    @ApiProperty({ example: 'RAM', description: 'Title of the information' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: '64 GB', description: 'Description of the information' })
    @IsNotEmpty()
    @IsString()
    description: string;
}

export class ProductDto {
    @ApiProperty({ example: 'Macbook Air', description: 'Title of the product' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'MB-1230', description: 'Code of the product' })
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({ example: '250000', description: 'Price of the product' })
    @IsNotEmpty()
    @IsNumberString({ message: 'Product price must be a number' })
    price: number;

    @ApiProperty({ example: '73', description: 'Quantity of the product' })
    @IsNotEmpty()
    @IsNumberString({ message: 'Product quantity must be a number' })
    quantity: number;

    @ApiProperty({ example: 'Laptop', description: 'Category of the product' })
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({ example: 'Macbook', description: 'Sub category of the product' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    subCategory?: string;

    @ApiProperty({
        example: ['good', 'better', 'best'],
        description: 'Tags of the product',
    })
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
    @Type(() => String)
    tags: string[];

    @ApiProperty({ example: false, description: 'Is the product featured?' })
    @IsOptional()
    @IsNotEmpty()
    @Transform(({ value }) => value === 'true', { toClassOnly: true })
    @IsBoolean()
    isFeatured: boolean;

    @ApiProperty({ example: 'Laptop', description: 'Alt of the product images', required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    imageAlt: string;

    @ApiProperty({ type: [Detail], example: [{ title: '2 years of warranty' }] })
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
    // @ValidateNested({ each: true })
    @Type(() => Detail)
    details: Detail[];

    @ApiProperty({
        type: [Information],
        example: [{ title: 'RAM', description: '64 GB' }],
    })
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
    // @ValidateNested({ each: true })
    @Type(() => Information)
    information: Information[];
}
