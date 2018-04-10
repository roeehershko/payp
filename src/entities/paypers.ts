import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {PaypersInventory} from './paypers_inventory';
import {PaypersIpo} from './paypers_ipo';
import {PaypersOrder} from './paypers_orders';
import {PaypersTransaction} from './paypers_transactions';

@Entity('paypers')
export class Payper {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    issued: number;

    @Column()
    sold: number;

    @Column()
    remaining: number;

    @OneToMany(type => PaypersInventory, paypers_inventory => paypers_inventory.payper_id)
    paypers_inventory: PaypersInventory[];

    @OneToMany(type => PaypersIpo, paypers_ipos => paypers_ipos.payper_id)
    paypers_ipos: PaypersIpo[];

    @OneToMany(type => PaypersOrder, paypers_orders => paypers_orders.payper)
    paypers_orders: PaypersOrder[];

    @OneToMany(type => PaypersTransaction, paypers_transactions => paypers_transactions.payper_id)
    paypers_transactions: PaypersTransaction[];

}
