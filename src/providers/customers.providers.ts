import { Connection, Repository } from 'typeorm';
import { Customer } from '../entities/customers';

export const customerProvider = {
    provide: 'CustomerRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Customer),
    inject: ['DbConnectionToken'],
};