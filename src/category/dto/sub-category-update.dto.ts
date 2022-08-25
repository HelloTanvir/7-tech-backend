import { IsNotEmpty, IsString } from 'class-validator';

export class SubCategoryUpdateDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
