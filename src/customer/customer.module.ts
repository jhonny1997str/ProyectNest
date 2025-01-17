/* eslint-disable prettier/prettier */
// src/customer/customer.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),  // Asegúrate de que esto esté aquí
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
