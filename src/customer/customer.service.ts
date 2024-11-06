/* eslint-disable prettier/prettier */

// src/customer/customer.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';  // Agregado HttpException y HttpStatus
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(customerData: Partial<Customer>): Promise<Customer> {
    try {
      const { customerName, email } = customerData;
  
      // Validar si el customerName está vacío
      if (!customerName || customerName.trim() === '') {
        throw new HttpException('El nombre del cliente es obligatorio', HttpStatus.BAD_REQUEST);
      }
  
      // Validar si el email está vacío
      if (!email || email.trim() === '') {
        throw new HttpException('El email es obligatorio', HttpStatus.BAD_REQUEST);
      }
  
      // Validar formato de email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new HttpException('El formato del email no es válido', HttpStatus.BAD_REQUEST);
      }
  
      // Verificar si el correo electrónico ya existe
      const existingCustomer = await this.customerRepository.findOne({ where: { email } });
      if (existingCustomer) {
        throw new HttpException('Ya existe un cliente con ese correo electrónico', HttpStatus.BAD_REQUEST);
      }
  
      // Crear el cliente y guardarlo
      const customer = this.customerRepository.create(customerData);
      return await this.customerRepository.save(customer);
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      // Mejor manejo del error
      if (error instanceof HttpException) {
        throw error; // Si es un HttpException, se relanza
      } else {
        throw new HttpException(
          'Hubo un error al intentar crear el cliente. Por favor, intente nuevamente.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  

  // Obtener todos los clientes con paginación y ordenación
  async findAll(
    limit: number = 2,
    offset: number = 0,
    orderField: string = 'customerName',
    orderDirection: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Customer[]> {
    try {
      return await this.customerRepository.find({
        take: limit,
        skip: offset,
        order: {
          [orderField]: orderDirection,
        },
      });
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      throw new Error('No se pudieron obtener los clientes debido a un error en la base de datos.');
    }
  }

  // Obtener un cliente por ID con manejo de errores y validación de entrada
  async findOne(id: number): Promise<Customer> {
    try {
      if (isNaN(id) || id <= 0) {
        throw new Error('El ID debe ser un número válido y positivo');
      }

      const customer = await this.customerRepository.findOne({
        where: { customerId: id },
      });

      if (!customer) {
        throw new Error(`No se encontró un cliente con el ID: ${id}`);
      }

      return customer;
    } catch (error) {
      console.error('Error al obtener el cliente:', error.message);
      throw new Error('No se pudo obtener el cliente debido a un error en la base de datos o al ID proporcionado.');
    }
  }

  // Actualizar un cliente
  async update(id: number, updateData: Partial<Customer>): Promise<Customer> {
    await this.customerRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Eliminar un cliente
  async delete(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
