import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CoinTransaction} from './coins_transactions';
import {PaxOrder} from './pax_orders';
import {Transfer} from './transfers';

@Entity('wallets')
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customer_id: number;

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
