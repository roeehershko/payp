import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import {PaxOrder} from './pax_orders';

@Entity('pax_orders_transactions')
export class PaxOrderTransaction {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => PaxOrder, order_id => order_id.pax_order_transactions)
    @JoinColumn({name: 'order_id'})
    order_id: number;

    @Column()
    amount: number;

    @Column()
    uid: number;

    @Column('datetime')
    created: Date;
}
