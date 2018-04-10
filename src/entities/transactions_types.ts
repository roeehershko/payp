import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CoinTransaction} from './coins_transactions';
import {PaypersTransaction} from './paypers_transactions';
import {Transfer} from './transfers';

@Entity('transactions_types')
export class TransactionType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => CoinTransaction, coins_transactionss => coins_transactionss.type_id)
    coins_transactions: CoinTransaction[];

    @OneToMany(type => PaypersTransaction, paypers_transactions => paypers_transactions.type_id)
    paypers_transactions: PaypersTransaction[];

    @OneToMany(type => Transfer, transfers => transfers.type_id)
    transfers: Transfer[];
}
