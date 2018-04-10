import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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
}
