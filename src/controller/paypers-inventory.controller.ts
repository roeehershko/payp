import {Get, Controller, HttpCode, HttpStatus, Query} from '@nestjs/common';
import {PaypersInventoryService} from '../services/paypers-inventory.service';

@Controller('paypers-inventories')
export class PaypersInventoryController {

    constructor(
        private readonly paypersInventoryService: PaypersInventoryService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getPaypersInventories(@Query() query) {
        return await this.paypersInventoryService.find(query);
    }
}
