import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    subCategories: string[];
}
