import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

class About {
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

export class UpdateAboutDto {
    @ApiProperty({ type: [About] })
    @IsOptional()
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
