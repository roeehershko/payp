import {Get, Controller, Res, Inject, Post, Req, HttpCode, HttpStatus, Body, Param} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Customer} from '../entities/customers';
import {AuthService} from '../services/auth.service';
import {TransferService} from '../services/transfer.service';

@Controller('coinbase')
export class CoinbaseController {

    constructor(
        private readonly transferService: TransferService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    public async postNotification(@Body() body) {
        if (body.type === 'wallet:addresses:new-payment') {
            return await this.transferService.approve(body);
        }
    }
}
