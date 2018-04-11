import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customers';
import {Transfer} from '../entities/transfers';
import {PaypersIpo} from '../entities/paypers_ipo';
import {PaxOrder} from '../entities/pax_orders';

export const paxOrderProvider = {
    provide: 'PaxOrderRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(PaxOrder),
    inject: ['DbConnectionToken'],
};