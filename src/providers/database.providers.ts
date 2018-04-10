import { createConnection } from 'typeorm';
import * as Path from 'path';

export const databaseProvider = {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
        type: 'mysql',
        host: '192.168.99.100',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'pax',
        entities: [
            Path.resolve(__dirname + '/../entities') + '/**/*{.ts,.js}',
        ],
    }),
};