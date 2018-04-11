import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customers';
import {Transfer} from '../entities/transfers';
import {PaypersIpo} from '../entities/paypers_ipo';
import {PaxOrder} from '../entities/pax_orders';
import {OrderStatus} from '../entities/orders_statuses';

export const orderStatusProvider = {
    provide: 'OrderStatusRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(OrderStatus),
    inject: ['DbConnectionToken'],
};