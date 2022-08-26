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

class Detail {
    @IsNotEmpty()
    @IsString()
    title: string;
}

class Information {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}

// this will be used in review dto for creating product review by user
// class Review {
//     @IsNotEmpty()
//     @IsString()
//     name: string;

//     @IsNotEmpty()
//     @IsDateString()
//     date: string;

//     @IsNotEmpty()
//     @IsString()
//     comment: string;

//     @IsNotEmpty()
//     @IsNumberString({ message: 'Variant stock must be a number' })
//     rating: number;
// }

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsNumberString({ message: 'Product price must be a number' })
    price: number;

    @IsNotEmpty()
    @IsNumberString({ message: 'Product quantity must be a number' })
    quantity: number;

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
    information: Information[];
}
