import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {Customer} from './customers';
import {Coin} from './coins';

@Entity('pax_orders_pairs')
export class PaxOrderPair {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(type => Coin, primary_coin_id => primary_coin_id.id)
    @JoinColumn({name: 'primary_coin_id'})
    primary_coin_id: Coin;

    @ManyToOne(type => Coin, primary_coin_id => primary_coin_id.id)
    @JoinColumn({name: 'secondary_coin_id'})
    secondary_coin_id: Coin;
}