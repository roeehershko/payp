import {Index, Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Wallet} from './wallets';
import {TransactionType} from './transactions_types';
import {TransferStatus} from './transfers_statuses';

@Entity('transfers')
@Index('status_id', ['status_id'])
@Index('type_id', ['type_id'])
@Index('wallet_id', ['wallet_id'])
export class Transfer {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Wallet, wallet_id => wallet_id.transfers)
    @JoinColumn({name: 'wallet_id'})
    wallet_id: Wallet;

    @Column()
    amount: number;

    @ManyToOne(type => TransactionType, type_id => type_id.transfers)
    @JoinColumn({name: 'type_id'})
    type_id: TransactionType;

    @ManyToOne(type => TransferStatus, status_id => status_id.transfers)
    @JoinColumn({name: 'status_id'})
    status_id: TransferStatus;

    @Column()
    blockchain_address: string;

    @Column()
    blockchain_hash: string;

    @Column('datetime')
    created: Date;

    @Column('datetime')
    modified: Date;
}
