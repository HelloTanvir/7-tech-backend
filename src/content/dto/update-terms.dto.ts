import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTermsDto {
    @ApiProperty({
        example: 'disclaimer',
        description: 'Title of the terms',
        enum: ['disclaimer', 'payment terms'],
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Description of the terms',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;
}
