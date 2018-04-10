import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Transfer} from './transfers';

@Entity('transfers_statuses')
export class TransferStatus {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => Transfer, transfers => transfers.status_id)
    transfers: Transfer[];
}