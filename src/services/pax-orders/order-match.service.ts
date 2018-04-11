import {Component, Inject} from '@nestjs/common';
import {PaxOrder} from '../../entities/pax_orders';
import {Wallet} from '../../entities/wallets';
import {Repository} from 'typeorm';
import {ORDER_TYPE_BUY} from '../../common/constants/order-types.types';
import {DividedOrders, OrderMatch} from './pax-orders.type';

@Component()
export class OrderMatchService {

    constructor(
        @Inject('PaxOrderRepositoryToken') private readonly paxOrderRepository: Repository<PaxOrder>,
        @Inject('WalletRepositoryToken') private readonly walletRepository: Repository<Wallet>,
    ) {}

    async matchForPair(pair_id) {
        console.log('HERE');

        // Get all orders for the current pair
        const orders = await this.paxOrderRepository.find({
            where: { order_status_id: 1, pax_order_pair_id: pair_id },
            relations: ['order_type_id'],
        });

        // Find matches
        const matches = this.getMatches(orders);

        // Get best matching orders
        const bestMatch = this.getBestMatch(matches);

        if (bestMatch) {
            // Process Best Match
            console.log(bestMatch);

            // Repeat process as long as match found
            this.matchForPair(pair_id);
        }
    }

    private getBestMatch(matches: Array<OrderMatch>): OrderMatch|null {
        let bestMatch: OrderMatch = null;
        matches.forEach((match: OrderMatch) => {
            if (bestMatch) {
                // Check for best match in price
                if (bestMatch.priceScore < match.priceScore) {
                    bestMatch = match;
                }
                // if prices are best match in more then one order, get the oldest
                else if (bestMatch.priceScore === match.priceScore && match.timespan < bestMatch.timespan) {
                    bestMatch = match;
                }
            }
            else {
                bestMatch = match;
            }
        });

        return bestMatch;
    }

    private getMatches(orders: Array<PaxOrder>): Array<OrderMatch> {
        // Divide orders (buy/sell)
        const { buyOrders, sellOrders } = this.divideOrders(orders);

        // Find matching orders
        const matches: Array<OrderMatch> = [];
        buyOrders.forEach((buyOrder: PaxOrder) => {
            sellOrders.forEach((sellOrder: PaxOrder) => {
                // Check if the prices matches
                if (buyOrder.price >= sellOrder.price) {
                    matches.push({
                        buyOrder: buyOrder,
                        sellOrder: sellOrder,
                        priceScore: buyOrder.price - sellOrder.price,
                        timespan: buyOrder.created.getTime() + sellOrder.created.getTime(),
                    });
                }
            });
        });

        return matches;
    }

    private divideOrders(orders: Array<PaxOrder>): DividedOrders {
        // Sort orders for sell/buy
        const buyOrders: Array<PaxOrder> = [];
        const sellOrders: Array<PaxOrder> = [];
        orders.forEach((order: PaxOrder) => {
            if (order.order_type_id.id === ORDER_TYPE_BUY) {
                buyOrders.push(order);
            } else {
                sellOrders.push(order);
            }
        });

        return {buyOrders, sellOrders};
    }
}