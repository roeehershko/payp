import {Get, Controller, Post, HttpCode, HttpStatus, Body, Query} from '@nestjs/common';
import {PaypersIpoService} from '../services/paypers-ipo.service';
import {BuyPaypersDto} from '../dto/paypers-ipo/buy-paypers.dto';

@Controller('paypers-ipo')
export class PaypersIpoController {

    constructor(
        private readonly paypersIpoService: PaypersIpoService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getPaypersIpo(@Query() query) {
        return await this.paypersIpoService.find(query);
    }

    @Post('/buy/:paypers_ipo_id')
    @HttpCode(HttpStatus.OK)
    public async postBuyIpo(@Body() data: BuyPaypersDto) {
        return await this.paypersIpoService.buy(data);
    }
}
