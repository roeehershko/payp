import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customers';
import {Transfer} from '../entities/transfers';

export const transferProvider = {
    provide: 'TransferRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Transfer),
    inject: ['DbConnectionToken'],
};