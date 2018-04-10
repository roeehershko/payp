import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {PaxOrder} from './pax_orders';
import {PaypersOrder} from './paypers_orders';

@Entity('orders_types')
export class OrderType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => PaxOrder, pax_orders => pax_orders.order_type_id)
    pax_orders: PaxOrder[];

    @OneToMany(type => PaypersOrder, paypers_orders => paypers_orders.order_type_id)
    paypers_orders: PaypersOrder[];

}
