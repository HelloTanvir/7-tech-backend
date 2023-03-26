import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

class Terms {
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

export class UpdateTermsDto {
    @ApiProperty({ type: [Terms] })
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
    @Type(() => Terms)
    terms: Terms[];
}
