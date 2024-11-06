/* eslint-disable prettier/prettier */
// src/customer/customer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // Crear un nuevo cliente
  async create(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepository.create(customerData);
    return this.customerRepository.save(customer);
  }

  // Obtener todos los clientes
  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  // Obtener un cliente por ID
  async findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOne({ where: { customerId: id } });
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
