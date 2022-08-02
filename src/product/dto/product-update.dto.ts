import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    // eslint-disable-next-line prettier/prettier
    ValidateNested
} from 'class-validator';

class Color {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;
}

class Detail {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;
}

class Information {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;
}

class Review {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString({ message: 'Variant stock must be a number' })
    rating: number;
}

export class ProductUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString({ message: 'Product price must be a number' })
    price: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString({ message: 'Product rating must be a number' })
    rating: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString({ message: 'Product review count must be a number' })
    reviewCount: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString({ message: 'Product quantity must be a number' })
    qty: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    category: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    imageAlt: string;

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
    @Type(() => Color)
    colors: Color[];

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
    @Type(() => Detail)
    details: Detail[];

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
    @Type(() => Information)
    informations: Information[];

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
    @Type(() => Review)
    reviews: Review[];
}
