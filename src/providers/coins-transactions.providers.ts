import { Connection } from 'typeorm';
import {CoinTransaction} from '../entities/coins_transactions';

export const coinTransactionProvider = {
    provide: 'CoinTransactionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(CoinTransaction),
    inject: ['DbConnectionToken'],
};