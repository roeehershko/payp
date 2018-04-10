import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { databaseProvider } from './providers/database.providers';
import { customerProvider } from './providers/customers.providers';
import * as passport from 'passport';
import {AuthService} from './services/auth.service';
import {CryptoService} from './services/crypto.service';
import {JwtStrategy} from './strategy/jwt.strategy';

@Module({
  imports: [],
  controllers: [AppController],
  components: [databaseProvider, customerProvider, JwtStrategy, AuthService, CryptoService],
})
export class ApplicationModule implements NestModule {

    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes({ path: '/auth', method: RequestMethod.GET });
    }
}
