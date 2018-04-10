import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customers';
import {Transfer} from '../entities/transfers';
import {Payper} from '../entities/paypers';

export const paypersProvider = {
    provide: 'PaypersRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Payper),
    inject: ['DbConnectionToken'],
};