import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    // eslint-disable-next-line prettier/prettier
    UnauthorizedException
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    // eslint-disable-next-line prettier/prettier
    ApiTags
} from '@nestjs/swagger';
import { GetCurrentUser } from '../common/decorators';
import { OrderDto } from './dto';
import { OrderService } from './order.service';
import { Order } from './schema';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create an order' })
    @ApiCreatedResponse({ type: Order })
    @ApiBearerAuth()
    create(@GetCurrentUser('isAdmin') isAdmin: boolean, @Body() dto: OrderDto): Promise<Order> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.orderService.create(dto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Gel all orders' })
    @ApiOkResponse({ type: [Order] })
    findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Get('/:orderId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Gel a single order' })
    @ApiOkResponse({ type: Order })
    findOne(@Param('orderId') orderId: string | number): Promise<Order> {
        return this.orderService.findOne(orderId);
    }
}
