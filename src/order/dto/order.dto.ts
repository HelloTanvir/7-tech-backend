import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

class ProductInfo {
    @ApiProperty({ example: 'r46frf1f6f46ef1', description: 'Ordered product id' })
    @IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty({ example: '10', description: 'Quantity of the ordered product' })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}

export class OrderDto {
    @ApiProperty({ example: '4f4f61e4fc6e4fe4f', description: 'Customer id' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({ type: [ProductInfo] })
    @IsNotEmpty()
    @Transform(
        ({ value }) => {
            if (value && typeof value === 'string') {
                return JSON.parse(value);
            } else if (value && typeof value === 'object') {
                return value;
            }
            return [];
        },
        { toClassOnly: true }
    )
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductInfo)
    products: ProductInfo[];

    @ApiProperty({ example: 'Uttara', description: 'Delivery address' })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ example: 'Dhaka', description: 'Delivery city' })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ example: 'Sector-10', description: 'Delivery zone' })
    @IsNotEmpty()
    @IsString()
    zone: string;
}
