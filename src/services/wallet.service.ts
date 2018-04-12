import {Component, Inject, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Wallet} from '../entities/wallets';
import {Coin} from '../entities/coins';
import {Customer} from '../entities/customers';

@Component()
export class WalletService {

    constructor(
        @Inject('WalletRepositoryToken') private readonly walletRepository: Repository<Wallet>,
    ) {}

    public async getWallet(customer: Customer, coin: Coin): Promise<Wallet> {
        return await this.walletRepository.findOne({
            where: {
                coin_id: coin,
                customer_id: customer,
            },
            relations: ['coin_id', 'customer_id'],
        });
    }

    public async getOrCreateWallet(customer: Customer, coin: Coin): Promise<Wallet> {
        const wallet = await this.walletRepository.findOne({
            where: {
                coin_id: coin,
                customer_id: customer,
            },
            relations: ['coin_id', 'customer_id'],
        });

        if ( ! wallet) {
           const wallet = new Wallet();
           wallet.coin_id = coin;
           wallet.balance = 0;
           wallet.customer_id = customer;

           return await this.walletRepository.save(wallet);
        }

        return wallet;
    }
}