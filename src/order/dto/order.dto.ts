import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

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
    @ApiProperty({ example: 'Tanvir Hossain', description: 'Customer name' })
    @IsNotEmpty()
    @IsString()
    customer_name: string;

    @ApiProperty({ example: '01325478641', description: 'Customer mobile number' })
    @IsNotEmpty()
    @IsString()
    customer_number: string;

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

    @ApiProperty({
        example: 'cash-on-delivery',
        description: 'Status of the order',
        enum: ['bkash', 'cash-on-delivery'],
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['bkash', 'cash-on-delivery'])
    payment_method: string;
}
