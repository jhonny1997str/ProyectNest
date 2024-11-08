/* eslint-disable prettier/prettier */
// Esta línea desactiva la regla de formateo de Prettier para que no haya conflictos de estilo de código con Prettier en este archivo.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/customer.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde .env

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Customer],
      synchronize: true,
    }),
    CustomerModule,
  ],
})
export class AppModule {}
