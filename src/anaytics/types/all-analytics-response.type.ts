import { ApiProperty } from '@nestjs/swagger';

export class AllAnalyticsResponse {
    @ApiProperty({ example: 1, type: Number })
    totalProducts: number;

    @ApiProperty({ example: 1, type: Number })
    totalOutOfStockProducts: number;

    @ApiProperty({ example: 1, type: Number })
    totalCategories: number;

    @ApiProperty({ example: 1, type: Number })
    totalOrders: number;

    @ApiProperty({ example: 1, type: Number })
    totalUsers: number;
}
