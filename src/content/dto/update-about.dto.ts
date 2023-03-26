import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAboutDto {
    @ApiProperty({
        example: 'disclaimer',
        description: 'Title of the about',
        enum: ['introduction', 'objective', 'partners & affiliates'],
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Description of the about',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Description of the about',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    topics: string[];
}
