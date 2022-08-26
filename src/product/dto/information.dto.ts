import { IsNotEmpty, IsString } from 'class-validator';

export class InformationDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
