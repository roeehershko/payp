import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import {getConnection} from 'typeorm';

@ValidatorConstraint({ name: 'uniqueField', async: false })
export class UniqueField implements ValidatorConstraintInterface {

    async validate(text: string, validationArguments: ValidationArguments) {
        const entity = await getConnection().getRepository(validationArguments.constraints[0]).findOne({
            where: { [validationArguments.constraints[1]]: text },
        });

        return !! entity;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Field already exists';
    }
}