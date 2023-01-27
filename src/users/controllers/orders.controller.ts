import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import {
  AddProductsToOrderDto,
  CreateOrderDto,
  UpdateOrderDto,
} from '../dtos/order.dto';
import { OrdersService } from '../services/orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  /* Get Methods */
  // Get all orders
  @Get()
  async getOrders() {
    return {
      message: await this.orderService.findAll(),
    };
  }

  // Get an order by id
  @Get('/:orderId')
  async getOrder(@Param('orderId', MongoIdPipe) orderId: string) {
    return {
      message: await this.orderService.findOne(orderId),
    };
  }

  /* Post Methods */
  // Create an order
  @Post()
  async createOrder(@Body() payload: CreateOrderDto) {
    return {
      message: await this.orderService.create(payload),
    };
  }

  /* Patch Methods */
  // Update an order
  @Patch('/:orderId')
  async updateOrder(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return {
      message: await this.orderService.update(orderId, payload),
    };
  }

  // Add products to an order
  @Patch('/:orderId/products')
  async updateProductsToOrder(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Body() payload: AddProductsToOrderDto,
  ) {
    return this.orderService.addProductsToOrder(orderId, payload.products);
  }

  /* Delete Methods */
  // Delete an order
  @Delete('/:orderId')
  async deleteOrder(@Param('orderId', MongoIdPipe) orderId: string) {
    return {
      message: await this.orderService.remove(orderId),
    };
  }

  // Delete products from an order
  @Delete('/:orderId/product/:productId')
  async removeProduct(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    const productRemoved = await this.orderService.removeProduct(
      orderId,
      productId,
    );
    return productRemoved;
  }
}
