import {Index, Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Payper} from './paypers';

@Entity('paypers_ipo')
@Index('payper_id', ['payper_id'])
export class PaypersIpo {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Payper, payper_id => payper_id.paypers_ipos)
    @JoinColumn({name: 'payper_id'})
    payper_id: Payper;

    @Column()
    request_quantity: number;

    @Column()
    remaining_quantity: number;

    @Column()
    position: number;

    @Column()
    cost: number;

    @Column('datetime')
    created: Date;

    @Column('datetime')
    modified: Date;

    @Column()
    pax_spent: number;
}
