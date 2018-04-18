import {Payper} from '../../entities/paypers';
import {Customer} from '../../entities/customers';
import {IsNotEmpty, IsNumber, Validate} from 'class-validator';
import {EntityExists} from '../../common/validation/constraints/entity-exists';

export class UpdateInventoryDto {

    @IsNotEmpty()
    @Validate(EntityExists, [Payper], { message: 'Payper is not exists' })
    payper_id: Payper;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @Validate(EntityExists, [Customer], { message: 'Payper is not exists' })
    customer_id: Customer;
}