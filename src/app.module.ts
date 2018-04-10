import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {databaseProvider} from './providers/database.providers';
import {customerProvider} from './providers/customers.providers';
import * as passport from 'passport';
import {AuthService} from './services/auth.service';
import {CryptoService} from './services/crypto.service';
import {JwtStrategy} from './strategy/jwt.strategy';
import {AuthController} from './controller/auth.controller';
import {transferProvider} from './providers/transfers.providers';
import {walletProvider} from './providers/wallets.providers';
import {transferStatusProvider} from './providers/transfers-statuses.providers';
import {transactionTypeProvider} from './providers/transaction-type.providers';
import {TransferService} from './services/transfer.service';
import {TransferController} from './controller/transfer.controller';
import {CoinbaseService} from './services/coinbase.service';
import {CoinbaseController} from './controller/coinbase.controller';
import {paypersIpoProvider} from './providers/paypers-ipo.providers';
import {paypersInventoryProvider} from './providers/paypers-inventory.providers';
import {paypersProvider} from './providers/paypers.providers';
import {PaypersIpoController} from './controller/paypers-ipo.controller';
import {PaypersIpoService} from './services/paypers-ipo.service';
import {PaypersInventoryService} from './services/paypers-inventory.service';
import {PaypersInventoryController} from './controller/paypers-inventory.controller';
import {paypersTransactionProvider} from './providers/paypers-transactions.providers';
import {PaypersTransactionService} from './services/paypers-transaction.service';

@Module({
    imports: [],
    controllers: [AuthController, TransferController, CoinbaseController, PaypersIpoController, PaypersInventoryController],
    components: [
        databaseProvider,
        customerProvider,
        transferProvider,
        walletProvider,
        transferStatusProvider,
        transactionTypeProvider,
        paypersIpoProvider,
        paypersInventoryProvider,
        paypersProvider,
        paypersTransactionProvider,
        JwtStrategy,
        AuthService,
        CryptoService,
        TransferService,
        CoinbaseService,
        PaypersIpoService,
        PaypersTransactionService,
        PaypersInventoryService,
    ],
})
export class ApplicationModule implements NestModule {

    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes({path: '/auth', method: RequestMethod.GET});
    }
}
