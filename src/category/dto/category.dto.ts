import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    subCategories: string[];
}
