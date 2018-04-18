import {Customer} from '../../entities/customers';
import {Payper} from '../../entities/paypers';
import {TransactionType} from '../../entities/transactions_types';
import {EntityExists} from '../../common/validation/constraints/entity-exists';
import {IsNotEmpty, IsNumber, Validate} from 'class-validator';

export class CreatePaypersTransactionDto {

    @IsNotEmpty()
    @Validate(EntityExists, [Customer], { message: 'Customer is not exists' })
    customer_id: Customer;

    @IsNotEmpty()
    @Validate(EntityExists, [Payper], { message: 'Payper is not exists' })
    payper_id: Payper;

    @IsNotEmpty()
    @Validate(TransactionType, [Payper], { message: 'Transaction type is invalid' })
    type_id: TransactionType;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    cost: number;
}