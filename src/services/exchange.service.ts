import {Component, Inject} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Wallet} from '../entities/wallets';
import {TYPE_RECEIVED, TYPE_SENT} from '../common/constants/transaction-types.types';
import {CoinTransaction} from '../entities/coins_transactions';
import {TransactionType} from '../entities/transactions_types';
import * as uuid from 'uuid/v4';

@Component()
export class ExchangeService {

    constructor(
        @Inject('WalletRepositoryToken') private readonly walletRepository: Repository<Wallet>,
        @Inject('TransactionTypeRepositoryToken') private readonly transactionTypeRepository: Repository<TransactionType>,
        @Inject('CoinTransactionRepositoryToken') private readonly coinTransactionRepository: Repository<CoinTransaction>,
    ) {}

    public async exchange(fromWallet: Wallet, toWallet: Wallet, amount: number, uid: string = null): Promise<string> {
        // TODO.secure the wallet money, there is 2 balance rows - balance, available_balance
        // This needs to be in a separate service ...
        // Generate uid if none given
        if ( ! uid)
            uid = uuid();

        // Create transactions entities
        const fromTransaction = await this.createExchangeTransaction(uid, amount, fromWallet, TYPE_SENT);
        const toTransaction = await this.createExchangeTransaction(uid, amount, toWallet, TYPE_RECEIVED);
        await this.coinTransactionRepository.save([fromTransaction, toTransaction]);

        // Update wallets to there new balances
        fromWallet.balance -= amount;
        toWallet.balance += amount;

        await this.walletRepository.save([toWallet, fromWallet]);

        // TODO.Create order match log

        return uid;
    }

    private async createExchangeTransaction(uid: string, amount: number, wallet: Wallet, type: number) {
        const transaction = new CoinTransaction();
        transaction.uid = uid;
        transaction.amount = amount;
        transaction.wallet_id = wallet;
        transaction.type_id = await this.transactionTypeRepository.findOneById(type);

        return transaction;
    }
}