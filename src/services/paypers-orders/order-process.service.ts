import {Component, Inject} from '@nestjs/common';
import {PaxOrder} from '../../entities/pax_orders';

@Component()
export class MatchService {

    constructor(
    ) {}

    private exchange(buyOrder: PaxOrder, sellOrder: PaxOrder) {
        // verify balance
        // create coin transactions
        // update wallet balance
        // update orders
    }
}