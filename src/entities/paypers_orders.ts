import {Index, Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import {OrderType} from './orders_types';
import {Customer} from './customers';
import {Payper} from './paypers';
import {OrderStatus} from './orders_statuses';

@Entity('paypers_orders')
@Index('customer_id', ['customer'])
@Index('order_status_id', ['order_status_id'])
@Index('order_type_id', ['order_type_id'])
@Index('payper_id', ['payper'])
export class PaypersOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => OrderType, order_type_id => order_type_id.paypers_orders)
    @JoinColumn({name: 'order_type_id'})
    order_type_id: OrderType;

    @ManyToOne(type => Customer, customer => customer.paypers_orders, { lazy: true })
    @JoinColumn({ name: 'customer_id' })
    customer: Promise<Customer>;

    @ManyToOne(type => Payper, payper => payper.paypers_orders)
    @JoinColumn({name: 'payper_id'})
    payper: Promise<Payper>;

    @ManyToOne(type => OrderStatus, order_status_id => order_status_id.paypers_orders)
    @JoinColumn({name: 'order_status_id'})
    order_status_id: Promise<OrderStatus>;

    @Column()
    request_quantity: number;

    @Column()
    remaining_quantity: number;

    @Column()
    cost: number;

    @Column('datetime')
    created: Date;

    @Column('datetime')
    modified: Date;
}
