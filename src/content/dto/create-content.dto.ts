import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TermsCreateDto {
    @ApiProperty({
        example: 'disclaimer',
        description: 'Title of the terms',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Description of the terms',
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}

export class PrivacyCreateDto {
    @ApiProperty({ example: 'information collection and use', description: 'Title of the privacy' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Description of the privacy',
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}

export class AboutCreateDto {
    @ApiProperty({
        example: 'disclaimer',
        description: 'Title of the about',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Description of the about',
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
