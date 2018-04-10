import {Component, Inject} from '@nestjs/common';
import {PaxOrder} from '../../entities/pax_orders';

@Component()
export class OrderMatchService {

    constructor(
    ) {}

    async findMatch() {
        // Get all orders
        // Find matching orders
        // Call Orders Processor
    }
}