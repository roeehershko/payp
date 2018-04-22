import {IsString, IsInt, IsIn, IsPositive, Validate} from 'class-validator';
import {Customer} from '../../entities/customers';
import {EntityExists} from '../../common/validation/constraints/entity-exists';
import {PaxOrderPair} from '../../entities/pax_orders_pairs';
import {OrderEligable} from '../../common/validation/constraints/order-eligable';

export class CreatePaxOrderDto {

    @IsInt()
    order_type_id: number;

    @IsInt()
    @IsPositive()
    @Validate(EntityExists, [PaxOrderPair], { message: 'Pair is not exists' })
    pax_order_pair_id: number;

    @IsInt()
    @IsPositive()
    @Validate(EntityExists, [Customer], { message: 'Customer is not exists' })
    customer_id: number;

    @IsInt()
    @IsPositive()
    request_amount: number;

    @IsInt()
    @IsPositive()
    @Validate(OrderEligable)
    price: number;
}