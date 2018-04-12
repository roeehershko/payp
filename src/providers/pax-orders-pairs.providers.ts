import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customers';
import {Transfer} from '../entities/transfers';
import {PaypersIpo} from '../entities/paypers_ipo';
import {PaxOrder} from '../entities/pax_orders';
import {PaxOrderPair} from '../entities/pax_orders_pairs';

export const paxOrderPairProvider = {
    provide: 'PaxOrderPairRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(PaxOrderPair),
    inject: ['DbConnectionToken'],
};