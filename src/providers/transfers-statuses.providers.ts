import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customers';
import {TransferStatus} from '../entities/transfers_statuses';

export const transferStatusProvider = {
    provide: 'TransferStatusRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(TransferStatus),
    inject: ['DbConnectionToken'],
};