import {Component, HttpException, Inject} from '@nestjs/common';
import {Customer} from '../entities/customers';
import {Repository} from 'typeorm';
import {CredentialsDto} from '../dto/credentials.dto';
import {CryptoService} from './crypto.service';
import {classToPlain} from 'class-transformer';
import * as jwt from 'jsonwebtoken';

@Component()
export class AuthService {

    constructor(
        private crypto: CryptoService,
        @Inject('CustomerRepositoryToken') private readonly customerRepository: Repository<Customer>) {}

    async createToken(data: CredentialsDto) {

        const user = await this.customerRepository.findOne({ where: { email: data.email || data.username } });
        if ( ! user) {
            throw new HttpException('Email not exists or invalid', 200);
         }

        const isValid = await this.crypto.comparePassword(data.password, user.password);

        if (isValid) {
            const expiresIn = 60 * 60 * 1000, secretOrKey = 'k34h51984y12731023';
            const token = jwt.sign(classToPlain(user), secretOrKey, { expiresIn });
            return {
                expires_in: expiresIn,
                access_token: token,
            };
        }
        else {
            throw new HttpException('Invalid email or password', 200);
        }
    }

    async validateUser(signedUser): Promise<boolean> {
        console.log('Validating..');
        // put some validation logic here
        // for example query user by id / email / username
        return true;
    }
}