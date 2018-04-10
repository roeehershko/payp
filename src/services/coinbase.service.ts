import {Component, Inject} from '@nestjs/common';
import * as coinbase from 'coinbase';

@Component()
export class CoinbaseService {

    constructor(){}

    public async createAddress(): Promise<string> {
        return new Promise<string>((resolve) => {
            const client = new coinbase.Client({
                apiKey: 'sFwbfXLZgBM86Ce8',
                apiSecret: 'oKR2dzWlek83YwfesVL5TZiRjP05Algi',
            });

            client.getAccount('primary', (err, account) => {
                account.createAddress(null, (err2, addr) => {
                    resolve(addr.address);
                });
            });
        });
    }
}