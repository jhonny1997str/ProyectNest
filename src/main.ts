/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';

async function bootstrap() {
  dotenv.config(); // Carga las variables de entorno desde el archivo .env
  
  const app = await NestFactory.create(AppModule);
  
  app.use(morgan('dev')); // Configura morgan para el registro de solicitudes
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server running in http://localhost:${port}`);
}

bootstrap();
