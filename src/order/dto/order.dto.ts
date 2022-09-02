import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderDto {
    @ApiProperty({ example: 'ieh44f4ef64we44fn66', description: 'User id of the order creator' })
    @IsNotEmpty()
    @IsString()
    userId: string;
}
