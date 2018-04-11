import {Component, Inject} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Wallet} from '../entities/wallets';

@Component()
export class ExchangeService {

    constructor(
        @Inject('WalletRepositoryToken') private readonly walletRepository: Repository<Wallet>,
    ) {}
}