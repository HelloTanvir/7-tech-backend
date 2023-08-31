import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class OrderUpdateDto {
    @ApiProperty({
        example: 'delivered',
        description: 'Status of the order',
        enum: [
            'pending',
            'delivered',
            'cancelled',
            'confirmed',
            'unreachable',
            'hold',
            'paid',
            'processing',
            'shiped',
            'refunded',
        ],
    })
    @IsNotEmpty()
    @IsString()
    @IsIn([
        'pending',
        'delivered',
        'cancelled',
        'confirmed',
        'unreachable',
        'hold',
        'paid',
        'processing',
        'shiped',
        'refunded',
    ])
    status: string;
}
