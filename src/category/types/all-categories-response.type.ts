import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schema';

export class AllCategoriesResponse {
    @ApiProperty({ example: 1, type: Number })
    count: number;
    @ApiProperty({ type: [Category] })
    categories: Category[];
}
