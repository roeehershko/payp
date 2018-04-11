import {Get, Controller, Post, HttpCode, HttpStatus, Body, Query, Param} from '@nestjs/common';
import {PaxOrdersService} from '../services/pax-orders.service';
import {CreatePaxOrderDto} from '../dto/pax-order/create-pax-order.type.dto';
import {OrderMatchService} from '../services/pax-orders/order-match.service';

@Controller('pax-orders')
export class PaxOrderController {

    constructor(
        private readonly paxOrderService: PaxOrdersService,
        private readonly orderMatchService: OrderMatchService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getPaxOrders(@Query() query) {
        return await this.paxOrderService.getAll(query);
    }

    @Get('match/:pairId')
    @HttpCode(HttpStatus.OK)
    public async getMatch(@Param('pairId') pairId) {
        return await this.orderMatchService.matchForPair(pairId);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    public async getPaxOrder(@Query() query, @Param('id') paxOrderId) {
        return await this.paxOrderService.get(paxOrderId);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    public async PostPaxOrder(@Body() data: CreatePaxOrderDto) {
        return await this.paxOrderService.create(data);
    }
}
