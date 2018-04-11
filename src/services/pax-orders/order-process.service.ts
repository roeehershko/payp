import {Component, Inject} from '@nestjs/common';
import {PaxOrder} from '../../entities/pax_orders';
import {Wallet} from '../../entities/wallets';
import {Repository} from 'typeorm';
import {Coin} from '../../entities/coins';
import {Customer} from '../../entities/customers';

@Component()
export class OrderProcessService {

    constructor(
        @Inject('PaxOrderRepositoryToken') private readonly paxOrderRepository: Repository<PaxOrder>,
        @Inject('WalletRepositoryToken') private readonly walletRepository: Repository<Wallet>,
    ) {}

    public async process(buyOrder: PaxOrder, sellOrder: PaxOrder) {
        const primaryCoin = await buyOrder.pax_order_pair_id.primary_coin_id;
        const secondaryCoin = await buyOrder.pax_order_pair_id.secondary_coin_id;

        this.processBuy(primaryCoin, secondaryCoin, buyOrder.customer_id, sellOrder.customer_id);
        this.processSell(primaryCoin, secondaryCoin, buyOrder.customer_id, sellOrder.customer_id);
    }

    public async processBuy(primaryCoin: Coin, secondaryCoin: Coin, buyer: Customer, seller: Customer) {
        const fromWallet = await this.walletRepository.findOne({
            where: {
                coin_id: primaryCoin,
                customer_id: seller,
            },
        });

        const toWallet = await this.walletRepository.findOne({
            where: {
                coin_id: primaryCoin,
                customer_id: buyer,
            },
        });

        this.exchange(fromWallet, toWallet);
    }

    public async processSell(primaryCoin: Coin, secondaryCoin: Coin, buyer: Customer, seller: Customer) {
        const fromWallet = await this.walletRepository.findOne({
            where: {
                coin_id: secondaryCoin,
                customer_id: seller,
            },
        });

        const toWallet = await this.walletRepository.findOne({
            where: {
                coin_id: secondaryCoin,
                customer_id: buyer,
            },
        });
    }

    public exchange(fromWallet: Wallet, toWallet: Wallet) {
        // TODO.secure the wallet money, there is 2 balance rows - balance, available_balance
        // Create transactions
        // Update wallets to there new balances
        // Notify the user somehow
        // ...This needs to be in a seperate service
    }
}