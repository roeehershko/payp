import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {CoinTransaction} from './coins_transactions';
import {Wallet} from './wallets';

@Entity('coins')
export class Coin {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        length: 3,
    })
    code: string;

    @OneToMany(type => Wallet, wallets => wallets.coin_id)
    wallets: Wallet[];
}
