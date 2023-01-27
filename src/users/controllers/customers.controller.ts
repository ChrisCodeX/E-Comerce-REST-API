import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from 'src/users/services/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  /* Get Methods */
  // Get all customers
  @Get()
  async getCustomers() {
    return {
      message: await this.customerService.findAll(),
    };
  }

  // Get a customer by id
  @Get('/:id')
  async getCustomer(@Param('id', MongoIdPipe) customerId: string) {
    return {
      message: await this.customerService.findOne(customerId),
    };
  }

  /* Post Methods */
  // Create a new customer
  @Post()
  async createCustomer(@Body() payload: CreateCustomerDto) {
    return {
      message: await this.customerService.create(payload),
    };
  }

  /* Patch Methods */
  // Update a customer
  @Patch('/:id')
  async updateCustomer(
    @Param('id', MongoIdPipe) customerId: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    return {
      message: await this.customerService.update(customerId, payload),
    };
  }

  /* Delete Methods */
  // Delete a customer
  @Delete('/:id')
  async deleteCustomer(@Param('id', MongoIdPipe) customerId: string) {
    return {
      message: await this.customerService.remove(customerId),
    };
  }
}
