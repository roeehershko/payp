import {Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {CoinTransaction} from './coins_transactions';
import {PaxOrder} from './pax_orders';
import {Transfer} from './transfers';
import {Customer} from './customers';

@Entity('wallets')
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Customer, customer_id => customer_id.wallets)
    @JoinColumn({name: 'customer_id'})
    customer_id: Customer;

    @Column()
    coin_id: number;

    @Column()
    balance: number;

    @OneToMany(type => CoinTransaction, coins_transactions => coins_transactions.wallet_id)
    coins_transactions: CoinTransaction[];

    @OneToMany(type => PaxOrder, pax_orders => pax_orders.wallet_id)
    pax_orders: PaxOrder[];

    @OneToMany(type => Transfer, transfers => transfers.wallet_id)
    transfers: Transfer[];

}
