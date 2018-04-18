import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import {getConnection} from 'typeorm';
import {CreatePaxOrderDto} from '../../../dto/pax-order/create-pax-order.type.dto';
import {PaxOrderPair} from '../../../entities/pax_orders_pairs';
import {ORDER_TYPE_BUY} from '../../constants/order-types.types';
import {Wallet} from '../../../entities/wallets';

@ValidatorConstraint({ name: 'orderEligible', async: false })
export class OrderEligable implements ValidatorConstraintInterface {

    async validate(text: string, validationArguments: ValidationArguments) {
        const data: CreatePaxOrderDto = validationArguments.object as CreatePaxOrderDto;
        const pair = await getConnection().getRepository(PaxOrderPair).findOneById(data.pax_order_pair_id, {
                relations: [ 'primary_coin_id', 'secondary_coin_id' ],
            });

        if ( ! pair) return true;

        let wallet: Wallet = null;
        let minBalance: number = null;
        if (data.order_type_id === ORDER_TYPE_BUY) {
            wallet = await getConnection().getRepository(Wallet).findOne({ where: { coin_id: pair.secondary_coin_id } });
            minBalance = data.price * data.request_amount;
        }
        else {
            wallet = await getConnection().getRepository(Wallet).findOne({ where: { coin_id: pair.primary_coin_id } });
            minBalance = data.request_amount;
        }

        return wallet.balance >= minBalance;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Your balance is too low';
    }
}