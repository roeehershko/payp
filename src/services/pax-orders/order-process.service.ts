import {Component, Inject} from '@nestjs/common';
import {PaxOrder} from '../../entities/pax_orders';
import {Wallet} from '../../entities/wallets';
import {Repository} from 'typeorm';
import {WalletService} from '../wallet.service';
import {CoinTransaction} from '../../entities/coins_transactions';
import {TransactionType} from '../../entities/transactions_types';
import {ExchangeService} from '../exchange.service';
import {OrderStatus} from '../../entities/orders_statuses';
import {ORDER_COMPLETED, ORDER_PARTIAL} from '../../common/constants/order-statuses.types';

@Component()
export class OrderProcessService {

    constructor(
        @Inject('PaxOrderRepositoryToken') private readonly paxOrderRepository: Repository<PaxOrder>,
        @Inject('OrderStatusRepositoryToken') private readonly orderStatusRepository: Repository<OrderStatus>,
        @Inject('WalletRepositoryToken') private readonly walletRepository: Repository<Wallet>,
        @Inject('TransactionTypeRepositoryToken') private readonly transactionTypeRepository: Repository<TransactionType>,
        @Inject('CoinTransactionRepositoryToken') private readonly coinTransactionRepository: Repository<CoinTransaction>,
        private readonly exchangeService: ExchangeService,
        private readonly walletService: WalletService,
    ) {}

    public async process(buyOrder: PaxOrder, sellOrder: PaxOrder) {
        console.log('Processing!');
        // Extract coins
        const primaryCoin = await buyOrder.pax_order_pair_id.primary_coin_id;
        const secondaryCoin = await buyOrder.pax_order_pair_id.secondary_coin_id;

        // Get primary exchange amount
        const amount = this.getExchangeAmount(buyOrder, sellOrder);

        // Get the order price
        const price = amount * this.getPrice(buyOrder, sellOrder);

        // Get primary wallets
        const primaryBuyWallet = await this.walletService.getOrCreateWallet(buyOrder.customer_id, primaryCoin);
        const primarySellWallet = await this.walletService.getWallet(sellOrder.customer_id, primaryCoin);

        // get secondary wallets
        const secondaryBuyWallet = await this.walletService.getWallet(buyOrder.customer_id, secondaryCoin);
        const secondarySellWallet = await this.walletService.getOrCreateWallet(sellOrder.customer_id, secondaryCoin);

        if (primaryBuyWallet && primarySellWallet && secondaryBuyWallet && secondarySellWallet) {
            // Move Primary from seller to buyer (amount)
            const uid = await this.exchangeService.exchange(primarySellWallet, primaryBuyWallet, amount);

            // Move secondary Coin from buyer to seller (price)
            this.exchangeService.exchange(secondaryBuyWallet, secondarySellWallet, price, uid);

            // Update order
            buyOrder.remaining_amount -= amount;
            sellOrder.remaining_amount -= amount;
            // Update order status
            await this.updateOrderStatus(buyOrder);
            await this.updateOrderStatus(sellOrder);

            await this.paxOrderRepository.save([buyOrder, sellOrder]);
            // Release locked balance
            // Create order transaction row
        }
        else {
            console.log('Missing wallet');
            // TODO.Log this error
        }
    }

    private async updateOrderStatus(order: PaxOrder): void {
        if (order.remaining_amount <= 0) {
            order.order_status_id = await this.orderStatusRepository.findOneById(ORDER_COMPLETED);
        } else {
            order.order_status_id = await this.orderStatusRepository.findOneById(ORDER_PARTIAL);
        }
    }

    private getPrice(buyOrder: PaxOrder, sellOrder: PaxOrder) {
        if (buyOrder.created.getTime() > sellOrder.created.getTime()) {
            return sellOrder.price;
        } else {
            return buyOrder.price;
        }
    }

    private getExchangeAmount(buyOrder: PaxOrder, sellOrder: PaxOrder) {
        let amount: number;

        if (buyOrder.remaining_amount < sellOrder.remaining_amount) {
            amount = buyOrder.remaining_amount;
        }
        else if (buyOrder.remaining_amount > sellOrder.remaining_amount) {
            amount = sellOrder.remaining_amount;
        }
        else {
            amount = buyOrder.remaining_amount;
        }

        return amount;
    }
}