import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/users/entities/customer.entity';
import { Model } from 'mongoose';

import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async findAll() {
    return new Promise(async (resolve) => {
      const customers = await this.customerModel.find().exec();
      resolve(customers);
    });
  }

  async findOne(customerId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const customer = await this.customerModel.findById(customerId).exec();
        if (!customer) {
          throw new NotFoundException(`customer #${customerId} not found`);
        }
        resolve(customer);
      } catch (error) {
        reject(error);
      }
    });
  }

  async create(payload: CreateCustomerDto) {
    return new Promise(async (resolve) => {
      const newCustomer = new this.customerModel(payload);
      const customerSaved = await newCustomer.save();
      resolve(customerSaved);
    });
  }

  async update(customerId: string, changes: UpdateCustomerDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const customer = await this.customerModel
          .findOneAndUpdate(
            {
              _id: customerId,
            },
            {
              $set: changes,
            },
            {
              new: true,
            },
          )
          .exec();

        if (!customer) {
          throw new NotFoundException(`customer #${customerId} not found`);
        }
        resolve(customer);
      } catch (error) {
        reject(error);
      }
    });
  }

  async remove(customerId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const customerDeleted = await this.customerModel.findByIdAndDelete(
          customerId,
        );
        if (!customerDeleted) {
          throw new NotFoundException(`customer #${customerId} not found`);
        }
        resolve(customerDeleted);
      } catch (error) {
        reject(error);
      }
    });
  }
}
