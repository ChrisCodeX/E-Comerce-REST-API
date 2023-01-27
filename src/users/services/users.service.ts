import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductsService } from 'src/products/services/products.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  async findAll() {
    return new Promise(async (resolve) => {
      const users = await this.userModel.find().exec();
      resolve(users);
    });
    // const apiKey = this.configService.get<string>('API_KEY');
    // console.log(apiKey);
  }

  async findOne(userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
          throw new NotFoundException(`user #${userId} not found`);
        }
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  async create(payload: CreateUserDto) {
    return new Promise(async (resolve) => {
      const newUser = new this.userModel(payload);
      const savedUser = await newUser.save();
      resolve(savedUser);
    });
  }

  async update(userId: string, changes: UpdateUserDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userModel
          .findByIdAndUpdate(userId, changes, {
            new: true,
          })
          .exec();

        if (!user) {
          throw new NotFoundException(`user #${userId} not found`);
        }

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  async remove(userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDeleted = await this.userModel.findByIdAndDelete(userId);
        if (!userDeleted) {
          throw new NotFoundException(`user #${userId} not found`);
        }
        resolve(userDeleted);
      } catch (error) {
        reject(error);
      }
    });
  }

  // async getOrderByUser(id: number) {
  //   const user = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     products: await this.productsService.findAll(),
  //   };
  // }
}
