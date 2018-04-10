import { Connection, Repository } from 'typeorm';
import {Wallet} from '../entities/wallets';

export const walletProvider = {
    provide: 'WalletRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Wallet),
    inject: ['DbConnectionToken'],
};