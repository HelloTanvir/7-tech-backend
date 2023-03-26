import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePrivacyDto {
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
