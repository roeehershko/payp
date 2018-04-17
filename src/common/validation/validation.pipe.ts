import {PipeTransform, Pipe, ArgumentMetadata, BadRequestException} from '@nestjs/common';
import {Validator} from 'class-validator';
import {plainToClass} from 'class-transformer';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {

    constructor(private validator: Validator) {}

    async transform(value, metadata: ArgumentMetadata) {
        const {metatype} = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await this.validator.validate(object);

        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}