import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createConnection } from 'typeorm';
import 'reflect-metadata'; // Required for typeorm: https://typeorm.io/#/
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Create app object
  const app = await NestFactory.create(AppModule);
  // Get config service
  const configService = app.get(ConfigService);
  // Ensure all routes validate incoming data by default
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  try {
    // Connect to db
    const pre_db = Date.now();
    await createConnection(configService.get('database'));
    console.info(`Connected to db in ${(Date.now() - pre_db) / 1000} seconds!`);
  } catch (err) {
    console.error('There was an issue connecting to the database', err);
  }
  try {
    await app.listen(configService.get('port'));
  } catch (err) {
    console.error(
      'Error starting listening server on port ' + configService.get('port'),
      err,
    );
  }
}

const pre_bs = Date.now();
bootstrap()
  .then((app) =>
    console.info(
      `Application running. Startup took ${
        (Date.now() - pre_bs) / 1000
      } seconds`,
    ),
  )
  .catch((err) => console.error('Error launching application: ', err));
