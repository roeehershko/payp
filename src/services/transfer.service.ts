import {Component, Inject, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Transfer} from '../entities/transfers';
import {CreateTransferDto} from '../dto/transfer/create-transfer.dto';
import {Wallet} from '../entities/wallets';
import {TransferStatus} from '../entities/transfers_statuses';
import {TransactionType} from '../entities/transactions_types';
import {CoinbaseService} from './coinbase.service';

@Component()
export class TransferService {

    constructor(
        private readonly coinbaseService: CoinbaseService,
        @Inject('WalletRepositoryToken') private readonly walletRepository: Repository<Wallet>,
        @Inject('TransferStatusRepositoryToken') private readonly transferStatusRepository: Repository<TransferStatus>,
        @Inject('TransactionTypeRepositoryToken') private readonly transactionTypeRepository: Repository<TransactionType>,
        @Inject('TransferRepositoryToken') private readonly transferRepository: Repository<Transfer>) {}

    async create(data: CreateTransferDto) {
        const transfer = new Transfer();
        transfer.wallet_id = await this.walletRepository.findOneById(data.wallet_id);
        transfer.status_id = await this.transferStatusRepository.findOneById(1);
        transfer.type_id = await this.transactionTypeRepository.findOneById(2);
        transfer.amount = data.amount;
        transfer.blockchain_address = await this.coinbaseService.createAddress();

        return await this.transferRepository.save(transfer);
    }

    async approve(data) {
        let transfer = await this.transferRepository.findOne(({ where: { blockchain_address: data.data.address, status_id: 1 } }));

        if ( ! transfer) {
            let duplicateTransfer = await this.transferRepository.findOne(({ where: { blockchain_address: data.data.address }, relations: ['wallet_id'] }));

            if ( ! duplicateTransfer) throw new NotFoundException('Transfer Not Found');

            transfer = new Transfer();
            transfer.wallet_id = duplicateTransfer.wallet_id;
            transfer.type_id = await this.transactionTypeRepository.findOneById(2);
            transfer.blockchain_address = data.data.address;
        }

        transfer.status_id = await this.transferStatusRepository.findOneById(2);
        transfer.blockchain_hash = data.additional_data.hash;
        transfer.amount = data.additional_data.amount.amount;
        transfer.wallet_id.balance = transfer.wallet_id.balance + parseFloat(data.additional_data.amount.amount);

        await this.walletRepository.save(transfer.wallet_id);

        return await this.transferRepository.save(transfer);
    }
}