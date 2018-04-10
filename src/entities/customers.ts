import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, JoinColumn, BaseEntity} from 'typeorm';
import {PaypersInventory} from './paypers_inventory';
import {PaypersOrder} from './paypers_orders';
import {PaypersTransaction} from './paypers_transactions';

@Entity('customers')
export class Customer extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column('datetime')
    created: Date;

    @Column('datetime')
    modified: Date;

    @Column('datetime')
    deleted: Date;

    @OneToMany(type => PaypersInventory, paypers_inventory => paypers_inventory.customer_id)
    paypers_inventory: PaypersInventory[];

    @OneToMany(type => PaypersOrder, paypers_orders => paypers_orders.customer, { lazy: true })
    paypers_orders: Promise<PaypersOrder[]>;

    @OneToMany(type => PaypersTransaction, paypers_transactions => paypers_transactions.customer_id)
    paypers_transactions: PaypersTransaction[];
}