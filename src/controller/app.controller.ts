import {Get, Controller, Res, Inject, Post, Req, HttpCode, HttpStatus, Body} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Customer} from '../entities/customers';
import {AuthService} from '../services/auth.service';

@Controller('/auth')
export class AppController {

    constructor(
        private readonly authService: AuthService,
        @Inject('CustomerRepositoryToken') private readonly customerRepository: Repository<Customer>) {}

    @Get()
    async root(@Req() req) {
        const customers = await this.customerRepository.findOneById(1);

        return {
            message: 'None Secured!',
            user: req.user,
        };
    }

    @Post('token')
    @HttpCode(HttpStatus.OK)
    public async getToken(@Body() body) {
        return await this.authService.createToken(body);
    }

    @Get('/login')
    async login(@Res() res, @Req() req) {
        const customers = await this.customerRepository.findOneById(1);
        return res.render('index', {
            message: 'Out of space message',
            customers,
            user: req.user,
            error: req.flash('error')[0],
        });
    }
}
