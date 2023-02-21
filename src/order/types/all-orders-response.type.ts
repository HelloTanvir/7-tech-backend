import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../schema';

export class AllOrdersResponse {
    @ApiProperty({ example: 1, type: Number })
    count: number;
    @ApiProperty({ type: [Order] })
    orders: Order[];
}
