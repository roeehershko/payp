import {Index, Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Wallet} from './wallets';
import {TransactionType} from './transactions_types';

@Entity('coins_transactions')
@Index('wallet_id', ['wallet_id'])
@Index('type_id', ['type_id'])
export class CoinTransaction {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Wallet, wallet_id => wallet_id.coins_transactions)
    @JoinColumn({name: 'wallet_id'})
    wallet_id: Wallet;

    @ManyToOne(type => TransactionType, type_id => type_id.coins_transactions)
    @JoinColumn({name: 'type_id'})
    type_id: TransactionType;

    @Column({
        length: 100,
    })
    uid: string;

    @Column()
    amount: number;

    @Column('datetime')
    created: Date;

}
