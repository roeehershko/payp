import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as express from 'express';
import * as hbs from 'express-hbs';
import * as path from 'path';
async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	app.use(express.static('public'));
	app.set('view engine', 'hbs');
	app.set('views', path.resolve(__dirname + '/../') + '/public/views');
	app.engine('hbs', hbs.express4({
        defaultLayout: path.resolve(__dirname + '/../') + '/public/views/layout.hbs',
        partialsDir: path.resolve(__dirname + '/../') + '/public/views/partials',
        layoutsDir: path.resolve(__dirname + '/../') + '/public/views/layouts',
    }));

	await app.listen(3000);
}
bootstrap();
