import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customers';
import {Transfer} from '../entities/transfers';
import {PaypersIpo} from '../entities/paypers_ipo';

export const paypersIpoProvider = {
    provide: 'PaypersIpoRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(PaypersIpo),
    inject: ['DbConnectionToken'],
};