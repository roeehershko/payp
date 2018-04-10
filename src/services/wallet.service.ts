import {Component, Inject, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Transfer} from '../entities/transfers';
import {CreateTransferDto} from '../dto/transfer/create-transfer.dto';
import {Wallet} from '../entities/wallets';
import {TransferStatus} from '../entities/transfers_statuses';
import {TransactionType} from '../entities/transactions_types';
import {CoinbaseService} from './coinbase.service';

@Component()
export class WalletService {

    constructor(
        @Inject('WalletRepositoryToken') private readonly walletRepository: Repository<Wallet>,
    ) {}
}