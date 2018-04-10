import {EntityRepository, Repository} from "typeorm";
import {PaypersIpo} from '../entities/paypers_ipo';
import {Payper} from '../entities/paypers';

@EntityRepository(PaypersIpo)
export class PaypersIpoRepository extends Repository<PaypersIpo> {

    async getCurrentIpo(payper_id: Payper) {
        return await this.createQueryBuilder('e')
            .where('e.remaining_quantity > 0')
            .orderBy('position', 'ASC')
            .getOne();
    }

}