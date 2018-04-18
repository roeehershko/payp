import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as cors from 'cors';
import {useContainer} from 'class-validator';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	const validationPipe = app
        .select(ApplicationModule)
        .get(ValidationPipe);

	useContainer(app.select(ApplicationModule), { fallback: true });

	app.useGlobalPipes(validationPipe);
	app.use(cors());
	await app.listen(3000);
}
bootstrap();
