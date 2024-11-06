/* eslint-disable prettier/prettier */
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/customer.entity';  // <-- Importa Customer aquí

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'solocali123#',
      database: 'proyect_nest',
      entities: [Customer],  // Ahora 'Customer' está definido correctamente
      synchronize: true,
    }),
    CustomerModule, // Importar CustomerModule aquí
  ],
})
export class AppModule {}
