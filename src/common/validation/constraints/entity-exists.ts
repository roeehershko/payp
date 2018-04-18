import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import {Connection, getConnection, Repository} from 'typeorm';
import {Component, Inject} from '@nestjs/common';

@ValidatorConstraint({ name: 'entityExists', async: false })
@Component()
export class EntityExists implements ValidatorConstraintInterface {

    constructor(
        @Inject('DbConnectionToken') private readonly connection: Connection,
    ) {}

    async validate(text: string, validationArguments: ValidationArguments) {
        const entity = await this.connection.getRepository(validationArguments.constraints[0]).findOneById(text);
        return !! entity;
    }

    defaultMessage(args: ValidationArguments) {
        console.log(args);
        return 'Entity not exists';
    }
}