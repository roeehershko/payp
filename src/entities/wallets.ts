import {Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {CoinTransaction} from './coins_transactions';
import {PaxOrder} from './pax_orders';
import {Transfer} from './transfers';
import {Customer} from './customers';
import {Coin} from './coins';

@Entity('wallets')
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Customer, customer_id => customer_id.wallets)
    @JoinColumn({name: 'customer_id'})
    customer_id: Customer;

    @ManyToOne(type => Coin, coin_id => coin_id.wallets)
    @JoinColumn({name: 'coin_id'})
    coin_id: Coin;

    @Column()
    balance: number;

    @Column()
    locked_balance: number;

    @OneToMany(type => CoinTransaction, coins_transactions => coins_transactions.wallet_id)
    coins_transactions: CoinTransaction[];

    @OneToMany(type => Transfer, transfers => transfers.wallet_id)
    transfers: Transfer[];

}
