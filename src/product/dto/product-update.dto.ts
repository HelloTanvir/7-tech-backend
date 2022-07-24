import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    // eslint-disable-next-line prettier/prettier
    ValidateNested
} from 'class-validator';

class Variants {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    size: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    color: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString({ message: 'Variant stock must be a number' })
    stock: number;
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
    @IsString()
    category: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    buyingPrice: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    sellingPrice: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    stock: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;

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
    @Type(() => Variants)
    variants: Variants[];
}
