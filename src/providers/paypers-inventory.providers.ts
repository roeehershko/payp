import { Connection } from 'typeorm';
import {PaypersInventory} from '../entities/paypers_inventory';

export const paypersInventoryProvider = {
    provide: 'PaypersInventoryRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(PaypersInventory),
    inject: ['DbConnectionToken'],
};