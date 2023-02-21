import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../schema';

export class AllProductsResponse {
    @ApiProperty({ example: 1, type: Number })
    count: number;
    @ApiProperty({ type: [Product] })
    products: Product[];
}
