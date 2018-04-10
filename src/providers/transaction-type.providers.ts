import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customers';
import {TransferStatus} from '../entities/transfers_statuses';
import {TransactionType} from '../entities/transactions_types';

export const transactionTypeProvider = {
    provide: 'TransactionTypeRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(TransactionType),
    inject: ['DbConnectionToken'],
};