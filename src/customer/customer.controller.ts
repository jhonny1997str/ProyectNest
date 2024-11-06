/* eslint-disable prettier/prettier */
// src/customer/customer.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { ParseIntPipe } from '@nestjs/common';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Crear un nuevo cliente
@Post()
async create(@Body() customerData: Partial<Customer>): Promise<Customer> {
  try {
    return await this.customerService.create(customerData);
  } catch (error) {
    const errorMessage = error?.message || 'Error al crear el cliente. Por favor, intente nuevamente.';
    const statusCode = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;

    console.error('Error al crear el cliente:', error);
    throw new HttpException(errorMessage, statusCode);
  }
}


  // Obtener todos los clientes con opciones de consulta y manejo de errores
  @Get()
  async findAll(
    @Query('limit') limit: number = 2, // Valor predeterminado
    @Query('offset') offset: number = 0, // Valor predeterminado
    @Query('orderField') orderField: string = 'customerName', // Valor predeterminado
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC', // Valor predeterminado
  ): Promise<Customer[]> {
    try {
      const customers = await this.customerService.findAll(limit, offset, orderField, orderDirection);
      return customers;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      throw new HttpException('Error al obtener los clientes.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Obtener un cliente por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    try {
      if (id <= 0) {
        throw new HttpException('El ID debe ser mayor que 0', HttpStatus.BAD_REQUEST);
      }

      const customer = await this.customerService.findOne(id);
      if (!customer) {
        throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
      }

      return customer;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Actualizar un cliente
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerService.update(id, updateData);
  }

  // Eliminar un cliente
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.customerService.delete(id);
  }
}
