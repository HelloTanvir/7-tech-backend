import { IsNotEmpty, IsString } from 'class-validator';

export class DetailsDto {
    @IsNotEmpty()
    @IsString()
    title: string;
}
