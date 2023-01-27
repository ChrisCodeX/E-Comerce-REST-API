import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    return new Promise(async (resolve) => {
      const order = await this.orderModel
        .find()
        .populate('customer')
        .populate('products')
        .exec();
      resolve(order);
    });
  }

  async findOne(orderId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await this.orderModel.findById(orderId).exec();
        if (!order) {
          throw new NotFoundException(`order #${orderId} not found`);
        }
        resolve(order);
      } catch (error) {
        reject(error);
      }
    });
  }

  async create(payload: CreateOrderDto) {
    return new Promise(async (resolve) => {
      const newOrder = new this.orderModel(payload);
      const orderSaved = await newOrder.save();
      resolve(orderSaved);
    });
  }

  async update(orderId: string, changes: UpdateOrderDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await this.orderModel
          .findByIdAndUpdate(orderId, changes, { new: true })
          .exec();

        if (!order) {
          throw new NotFoundException(`order #${orderId} not found`);
        }
        resolve(order);
      } catch (error) {
        reject(error);
      }
    });
  }

  async remove(orderId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const orderDeleted = await this.orderModel.findByIdAndDelete(orderId);
        if (!orderDeleted) {
          throw new NotFoundException(`order #${orderId} not found`);
        }
        resolve(orderDeleted);
      } catch (error) {
        reject(error);
      }
    });
  }

  async removeProduct(orderId: string, productId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await this.orderModel.findById(orderId);
        order.products.pull(productId);
        const orderSaved = order.save();
        resolve(orderSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  async addProductsToOrder(orderId: string, productsIds: Types.ObjectId[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await this.orderModel.findById(orderId);
        productsIds.forEach((productId) => {
          order.products.push(productId);
        });
        const orderSaved = order.save();
        resolve(orderSaved);
      } catch (error) {
        reject(error);
      }
    });
  }
}
