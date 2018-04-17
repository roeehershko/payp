import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import {getConnection} from 'typeorm';

@ValidatorConstraint({ name: 'entityExists', async: false })
export class EntityExists implements ValidatorConstraintInterface {

    async validate(text: string, validationArguments: ValidationArguments) {
        const customer = await getConnection().getRepository(validationArguments.constraints[0]).findOneById(text);
        return !! customer;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Email already exists';
    }
}