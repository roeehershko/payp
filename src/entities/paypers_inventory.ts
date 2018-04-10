import {Index, Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, BeforeUpdate} from 'typeorm';
import {Customer} from './customers';
import {Payper} from './paypers';

@Entity('paypers_inventory')
@Index('customer_id', ['customer_id'])
@Index('payper_id', ['payper_id'])
export class PaypersInventory {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Customer, customer_id => customer_id.paypers_inventory)
    @JoinColumn({name: 'customer_id'})
    customer_id: Customer;

    @ManyToOne(type => Payper, payper_id => payper_id.paypers_inventory)
    @JoinColumn({name: 'payper_id'})
    payper_id: Payper;

    @Column()
    quantity: number;

    @Column('datetime')
    created: Date;

    @Column('datetime')
    modified: Date;

    @BeforeUpdate()
    updateDates() {
        this.modified = new Date();
    }
}
