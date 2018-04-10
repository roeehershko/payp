import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import {getConnection} from 'typeorm';
import {Customer} from '../../../entities/customers';

@ValidatorConstraint({ name: 'emailExists', async: false })
export class UniqueEmail implements ValidatorConstraintInterface {

    async validate(text: string, args: ValidationArguments) {
        const customer = await getConnection().getRepository(Customer).findOneById(1);
        return !! customer;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Email already exists';
    }
}