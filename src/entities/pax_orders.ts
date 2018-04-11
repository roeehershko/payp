import {Index, Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany, BeforeUpdate, BeforeInsert} from 'typeorm';
import {OrderType} from './orders_types';
import {Wallet} from './wallets';
import {OrderStatus} from './orders_statuses';
import {PaxOrderTransaction} from './pax_orders_transactions';
import {PaxOrderPair} from './pax_orders_pairs';
import {Customer} from './customers';

@Entity('pax_orders')
@Index('order_status_id', ['order_status_id'])
@Index('order_type_id', ['order_type_id'])
@Index('pax_order_pair_id', ['pax_order_pair_id'])
export class PaxOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => OrderType, order_type_id => order_type_id.pax_orders)
    @JoinColumn({name: 'order_type_id'})
    order_type_id: OrderType;

    @ManyToOne(type => PaxOrderPair, pax_order_pair_id => pax_order_pair_id.id)
    @JoinColumn({name: 'pax_order_pair_id'})
    pax_order_pair_id: PaxOrderPair;


    @ManyToOne(type => Customer, customer_id => customer_id.pax_orders)
    @JoinColumn({name: 'customer_id'})
    customer_id: Customer;

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

    @BeforeUpdate()
    beforeUpdate() {
        this.modified = new Date();
    }

    @BeforeInsert()
    beforeInsert() {
        this.modified = new Date();
        this.created = new Date();
    }
}
