import { IsNotEmpty, IsString } from 'class-validator';

export class SubCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
