import {Customer} from '../../entities/customers';
import {Payper} from '../../entities/paypers';
import {TransactionType} from '../../entities/transactions_types';

export class CreatePaypersTransactionDto {
    customer_id: Customer;
    payper_id: Payper;
    type_id: TransactionType;
    quantity: number;
    cost: number;
}