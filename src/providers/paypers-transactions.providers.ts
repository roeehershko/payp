import { Connection } from 'typeorm';
import {PaypersTransaction} from '../entities/paypers_transactions';

export const paypersTransactionProvider = {
    provide: 'PaypersTransactionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(PaypersTransaction),
    inject: ['DbConnectionToken'],
};