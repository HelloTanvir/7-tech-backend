import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumberString, IsString, ValidateNested } from 'class-validator';

class Variants {
    @IsNotEmpty()
    @IsString()
    size: string;

    @IsNotEmpty()
    @IsString()
    color: string;

    @IsNotEmpty()
    @IsNumberString({ message: 'Variant stock must be a number' })
    stock: number;
}

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsNumberString()
    buyingPrice: number;

    @IsNotEmpty()
    @IsNumberString()
    sellingPrice: number;

    @IsNotEmpty()
    @IsNumberString()
    stock: number;

    @IsNotEmpty()
    @IsString()
    description: string;

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
