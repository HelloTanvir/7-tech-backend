import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    // eslint-disable-next-line prettier/prettier
    UnauthorizedException
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    // eslint-disable-next-line prettier/prettier
    ApiTags
} from '@nestjs/swagger';
import { GetCurrentUser, Public } from '../common/decorators';
import { OrderDto, OrderUpdateDto } from './dto';
import { OrderService } from './order.service';
import { Order } from './schema';
import { AllOrdersResponse } from './types';

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
    @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
    @ApiQuery({ name: 'size', example: 15, type: Number, required: false })
    @ApiQuery({ name: 'searchQuery', example: 'searching is a costly operation', required: false })
    @ApiOperation({ summary: 'Get all orders' })
    @ApiOkResponse({ type: [Order] })
    @ApiBearerAuth()
    findAll(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Query('page', new DefaultValuePipe(1), new ParseIntPipe()) page: number,
        @Query('size', new DefaultValuePipe(15), new ParseIntPipe()) size: number,
        @Query('searchQuery') searchQuery: string
    ): Promise<AllOrdersResponse> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.orderService.findAll(page, size, searchQuery);
    }

    @Get('/:orderId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'orderId', type: 'string' })
    @ApiOperation({ summary: 'Get a single order' })
    @ApiOkResponse({ type: Order })
    @ApiBearerAuth()
    findOne(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('orderId') orderId: string | number
    ): Promise<Order> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.orderService.findOne(orderId);
    }

    @Put('/:orderId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'orderId', type: 'string' })
    @ApiOperation({ summary: 'Update an order' })
    @ApiOkResponse({ type: Order })
    @ApiBearerAuth()
    update(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('orderId') orderId: string | number,
        @Body() dto: OrderUpdateDto
    ): Promise<Order> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.orderService.update(orderId, dto);
    }

    @Delete('/:orderId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'orderId', type: 'string' })
    @ApiOperation({ summary: 'Delete an order' })
    @ApiOkResponse({ type: Order })
    @ApiBearerAuth()
    delete(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('orderId') orderId: string | number
    ): Promise<Order> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.orderService.delete(orderId);
    }
}
