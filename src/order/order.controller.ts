import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
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
import { GetCurrentUser, Public } from '../common/decorators';
import { OrderDto, OrderUpdateDto } from './dto';
import { OrderService } from './order.service';
import { Order } from './schema';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create an order' })
    @ApiCreatedResponse({ type: Order })
    create(@Body() dto: OrderDto): Promise<Order> {
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

    @Put('/:orderId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update an order' })
    @ApiOkResponse({ type: Order })
    @ApiBearerAuth()
    update(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('orderId') orderId: string | number,
        @Body() dto: OrderUpdateDto
    ): Promise<Order> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.orderService.update(orderId, dto);
    }

    @Delete('/:orderId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete an order' })
    @ApiOkResponse({ type: Order })
    @ApiBearerAuth()
    delete(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('orderId') orderId: string | number
    ): Promise<Order> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.orderService.delete(orderId);
    }
}
