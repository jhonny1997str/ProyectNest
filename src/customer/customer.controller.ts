/* eslint-disable prettier/prettier */
// src/customer/customer.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Crear un nuevo cliente
  @Post()
  create(@Body() customerData: Partial<Customer>): Promise<Customer> {
    return this.customerService.create(customerData);
  }

  // Obtener todos los clientes
  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  // Obtener un cliente por ID
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  // Actualizar un cliente
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerService.update(id, updateData);
  }

  // Eliminar un cliente
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.customerService.delete(id);
  }
}




