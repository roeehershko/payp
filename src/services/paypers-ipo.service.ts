import {BadRequestException, Component, Inject} from '@nestjs/common';
import {EventSubscriber, Repository} from 'typeorm';
import {PaypersIpo} from '../entities/paypers_ipo';
import {BuyPaypersDto} from '../dto/paypers-ipo/buy-paypers.dto';
import {Customer} from '../entities/customers';
import {Wallet} from '../entities/wallets';
import {PAX_COIN} from '../common/constants/coins.types';
import {PaypersTransaction} from '../entities/paypers_transactions';
import {TransactionType} from '../entities/transactions_types';
import {TYPE_RECEIVED} from '../common/constants/transaction-types.types';
import {PaypersTransactionService} from './paypers-transaction.service';
import {PaypersInventoryService} from './paypers-inventory.service';
import {getCustomRepository} from "typeorm";
import {PaypersIpoRepository} from '../repository/paypers-ipo.repo';
import {Payper} from '../entities/paypers';
@Component()
@EventSubscriber()
export class PaypersIpoService {

    constructor(
        @Inject('PaypersRepositoryToken') private readonly paypersRepository: Repository<Payper>,
        @Inject('CustomerRepositoryToken') private readonly customersRepository: Repository<Customer>,
        @Inject('PaypersIpoRepositoryToken') private readonly paypersIpoRepository: Repository<PaypersIpo>,
        @Inject('WalletRepositoryToken') private readonly walletRepository: Repository<Wallet>,
        @Inject('TransactionTypeRepositoryToken') private readonly transactionTypeRepository: Repository<TransactionType>,
        @Inject('PaypersTransactionRepositoryToken') private readonly paypsersTransactionRepository: Repository<PaypersTransaction>,
        private readonly paypersTransactionService: PaypersTransactionService,
        private readonly paypersInventoryService: PaypersInventoryService,
    ) {}

    async find(where) {
        return this.paypersIpoRepository.find({ where });
    }

    async buy(data: BuyPaypersDto) {
        const payper = await this.paypersRepository.findOneById(data.payper_id);
        const paypersIpo = await getCustomRepository(PaypersIpoRepository).getCurrentIpo(payper);
        const customer = await this.customersRepository.findOneById(data.customer_id);
        const paxWallet = await this.walletRepository.findOne({ where: { customer_id: customer, coin_id: PAX_COIN } });

        if ( ! paxWallet) {
            // create wallet
            throw new BadRequestException('wallet missing');
        }

        // Confirm the customer has enough balance
        const cost = data.quantity * paypersIpo.cost;
        if (paxWallet.balance < cost) {
            throw new BadRequestException('amount too high for your balance');
        }

        // Update Wallet Balance
        paxWallet.balance = paxWallet.balance -= cost;
        await this.walletRepository.save(paxWallet);

        // Create Coin Transaction
        // Update customer inventory
        await this.paypersInventoryService.update({ customer_id: customer, payper_id: payper, quantity: data.quantity });

        // Create Payper transaction
        await this.paypersTransactionService.create({
            cost: cost,
            customer_id: customer,
            payper_id: payper,
            quantity: data.quantity,
            type_id: await this.transactionTypeRepository.findOneById(TYPE_RECEIVED),
        });

        // Update Ipo
        paypersIpo.pax_spent = paypersIpo.pax_spent + cost;
        paypersIpo.remaining_quantity = paypersIpo.remaining_quantity - data.quantity;
        await this.paypersIpoRepository.save(paypersIpo);

        return paxWallet;
    }
}