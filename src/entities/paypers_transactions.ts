import {Index, Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Customer} from './customers';
import {TransactionType} from './transactions_types';
import {Payper} from './paypers';

@Entity('paypers_transactions')
@Index('customer_id', ['customer_id'])
@Index('payper_id', ['payper_id'])
@Index('type_id', ['type_id'])
export class PaypersTransaction {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Customer, customer_id => customer_id.paypers_transactions)
    @JoinColumn({name: 'customer_id'})
    customer_id: Customer;

    @ManyToOne(type => TransactionType, type_id => type_id.paypers_transactions)
    @JoinColumn({name: 'type_id'})
    type_id: TransactionType;

    @ManyToOne(type => Payper, payper_id => payper_id.paypers_transactions)
    @JoinColumn({name: 'payper_id'})
    payper_id: Payper;

    @Column()
    quantity: number;

    @Column()
    cost: number;

    @Column('datetime')
    created: Date;
}
