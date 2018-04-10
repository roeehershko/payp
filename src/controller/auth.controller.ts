import {Get, Controller, Res, Inject, Post, Req, HttpCode, HttpStatus, Body} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Customer} from '../entities/customers';
import {AuthService} from '../services/auth.service';

@Controller('/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        @Inject('CustomerRepositoryToken') private readonly customerRepository: Repository<Customer>) {}

    @Post('token')
    @HttpCode(HttpStatus.OK)
    public async getToken(@Body() body) {
        return await this.authService.createToken(body);
    }
}
