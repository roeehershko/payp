import {IsNotEmpty, IsNumber, Validate} from 'class-validator';
import {Payper} from '../../entities/paypers';
import {TransactionType} from '../../entities/transactions_types';
import {Customer} from '../../entities/customers';

export class BuyPaypersDto {

    @IsNotEmpty()
    @Validate(Payper, [Payper], { message: 'Payper is invalid' })
    payper_id: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @Validate(Customer, [Payper], { message: 'Customer is invalid' })
    customer_id: number;
}