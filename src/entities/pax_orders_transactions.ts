import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import {PaxOrder} from './pax_orders';

@Entity('pax_orders_transactions')
export class PaxOrderTransaction {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => PaxOrder, buy_order_id => buy_order_id.pax_order_buy_transactions)
    @JoinColumn({name: 'buy_order_id'})
    buy_order_id: number;

    @ManyToOne(type => PaxOrder, sell_order_id => sell_order_id.pax_order_sell_transactions)
    @JoinColumn({name: 'sell_order_id'})
    sell_order_id: number;

    @Column()
    amount: number;

    @Column()
    uid: number;

    @Column('datetime')
    created: Date;
}
