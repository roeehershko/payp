import {BadRequestException, Component, Inject} from '@nestjs/common';
import {Repository} from 'typeorm';
import {PaypersIpo} from '../entities/paypers_ipo';
import {BuyPaypersDto} from '../dto/paypers-ipo/buy-paypers.dto';
import {Customer} from '../entities/customers';
import {Wallet} from '../entities/wallets';
import {PAX_COIN} from '../common/constants/coins.types';
import {PaypersTransaction} from '../entities/paypers_transactions';
import {TransactionType} from '../entities/transactions_types';
import {TYPE_RECEIVED} from '../common/constants/transaction-types.types';
import {CreatePaypersTransactionDto} from '../dto/paypers-transaction/create-paypers-transaction.dto';

@Component()
export class PaypersTransactionService {

    constructor(
        @Inject('PaypersTransactionRepositoryToken') private readonly paypsersTransactionRepository: Repository<PaypersTransaction>,
    ) {}

    async create(data: CreatePaypersTransactionDto) {
        console.log(data);
        const paypersTransaction = new PaypersTransaction();
        paypersTransaction.cost = data.cost;
        paypersTransaction.customer_id = data.customer_id;
        paypersTransaction.payper_id = data.payper_id;
        paypersTransaction.quantity = data.quantity;
        paypersTransaction.type_id = data.type_id;

        return await this.paypsersTransactionRepository.save(paypersTransaction);
    }
}