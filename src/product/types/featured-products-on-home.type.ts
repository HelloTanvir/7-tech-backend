import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../schema';

export class FeaturedProductsOnHome {
    @ApiProperty()
    tagline: string;
    @ApiProperty({ type: [Product] })
    products: Product[];
}
