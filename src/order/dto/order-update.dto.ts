import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class OrderUpdateDto {
    @ApiProperty({
        example: 'delivered',
        description: 'Status of the order',
        enum: ['pending', 'delivered', 'cancelled'],
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['pending', 'delivered', 'cancelled'])
    status: string;
}
