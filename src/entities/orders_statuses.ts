import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {PaxOrder} from './pax_orders';
import {PaypersOrder} from './paypers_orders';

@Entity('orders_statuses')
export class OrderStatus {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => PaxOrder, pax_orders => pax_orders.order_status_id)
    pax_orders: PaxOrder[];

    @OneToMany(type => PaypersOrder, paypers_orders => paypers_orders.order_status_id)
    paypers_orders: PaypersOrder[];

}
