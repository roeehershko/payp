import {Index, Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {OrderType} from './orders_types';
import {Wallet} from './wallets';
import {OrderStatus} from './orders_statuses';
import {PaxOrderTransaction} from './pax_orders_transactions';

@Entity('pax_orders')
@Index('order_status_id', ['order_status_id'])
@Index('order_type_id', ['order_type_id'])
@Index('wallet_id', ['wallet_id'])
export class PaxOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => OrderType, order_type_id => order_type_id.pax_orders)
    @JoinColumn({name: 'order_type_id'})
    order_type_id: OrderType;

    @ManyToOne(type => Wallet, wallet_id => wallet_id.pax_orders)
    @JoinColumn({name: 'wallet_id'})
    wallet_id: Wallet;

    @ManyToOne(type => OrderStatus, order_status_id => order_status_id.pax_orders)
    @JoinColumn({name: 'order_status_id'})
    order_status_id: OrderStatus;

    @OneToMany(type => PaxOrderTransaction, pax_order_transactions => pax_order_transactions.order_id)
    pax_order_transactions: PaxOrderTransaction[];

    @Column()
    request_amount: number;

    @Column()
    remaining_amount: number;

    @Column()
    price: number;

    @Column('datetime')
    created: Date;

    @Column('datetime')
    modified: Date;
}
