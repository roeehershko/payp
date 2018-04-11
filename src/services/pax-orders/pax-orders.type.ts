import {PaxOrder} from '../../entities/pax_orders';

export interface OrderMatch {
    buyOrder: PaxOrder;
    sellOrder: PaxOrder;
    priceScore: number;
    timespan: number;
}

export interface DividedOrders {
    buyOrders: Array<PaxOrder>;
    sellOrders: Array<PaxOrder>;
}
