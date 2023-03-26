import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

class Terms {
    @ApiProperty({
        example: 'disclaimer',
        description: 'Title of the terms',
        enum: ['disclaimer', 'payment terms'],
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

class Privacy {
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

class About {
    @ApiProperty({
        example: 'disclaimer',
        description: 'Title of the about',
        enum: ['introduction', 'objective', 'partners & affiliates'],
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

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Description of the about',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    topics: string[];
}

export class CreateContentDto {
    @ApiProperty({ type: [Terms] })
    @IsNotEmpty()
    @Transform(
        ({ value }) => {
            if (value && typeof value === 'string') {
                return JSON.parse(value);
            } else if (value && typeof value === 'object') {
                return value;
            }
            return [];
        },
        { toClassOnly: true }
    )
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Terms)
    terms: Terms[];

    @ApiProperty({ type: [Privacy] })
    @IsNotEmpty()
    @Transform(
        ({ value }) => {
            if (value && typeof value === 'string') {
                return JSON.parse(value);
            } else if (value && typeof value === 'object') {
                return value;
            }
            return [];
        },
        { toClassOnly: true }
    )
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Privacy)
    privacy: Privacy[];

    @ApiProperty({ type: [About] })
    @IsNotEmpty()
    @Transform(
        ({ value }) => {
            if (value && typeof value === 'string') {
                return JSON.parse(value);
            } else if (value && typeof value === 'object') {
                return value;
            }
            return [];
        },
        { toClassOnly: true }
    )
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => About)
    about: About[];
}
