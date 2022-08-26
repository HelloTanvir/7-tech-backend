import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class ReviewDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    @IsNumberString({ message: 'Rating must be a number' })
    rating: number;
}
