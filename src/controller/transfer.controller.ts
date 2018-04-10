import {Get, Controller, Res, Inject, Post, Req, HttpCode, HttpStatus, Body, Param} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Customer} from '../entities/customers';
import {AuthService} from '../services/auth.service';
import {TransferService} from '../services/transfer.service';

@Controller('transfers')
export class TransferController {

    constructor(
        private readonly transferService: TransferService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    public async postTransfer(@Body() body) {
        return await this.transferService.create(body);
    }
}
