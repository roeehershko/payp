import {Payper} from '../../entities/paypers';
import {Customer} from '../../entities/customers';

export interface UpdateInventoryDto {
    payper_id: Payper;
    quantity: number;
    customer_id: Customer;
}