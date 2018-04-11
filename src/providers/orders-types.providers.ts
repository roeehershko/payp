import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customers';
import {Transfer} from '../entities/transfers';
import {PaypersIpo} from '../entities/paypers_ipo';
import {PaxOrder} from '../entities/pax_orders';
import {OrderStatus} from '../entities/orders_statuses';
import {OrderType} from '../entities/orders_types';

export const orderTypeProvider = {
    provide: 'OrderTypeRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(OrderType),
    inject: ['DbConnectionToken'],
};