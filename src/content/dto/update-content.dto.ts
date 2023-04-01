import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TermsUpdateDto {
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

export class PrivacyUpdateDto {
    @ApiProperty({ example: 'information collection and use', description: 'Title of the privacy' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Description of the privacy',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;
}

export class AboutUpdateDto {
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
}
