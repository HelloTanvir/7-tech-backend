import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReviewDto {
    @ApiProperty({
        example: 'Quality of the laptop is pretty good.',
        description: 'Comment in the review',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    comment: string;

    @ApiProperty({ example: 5, description: 'rating in the review' })
    @IsNotEmpty()
    @IsNumber()
    rating: number;
}
