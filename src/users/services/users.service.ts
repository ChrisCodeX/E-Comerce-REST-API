import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

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

  async findByEmail(email: string) {
    return new Promise<User>((resolve) => {
      const user = this.userModel.findOne({ email }).exec();
      resolve(user);
    });
  }

  async create(payload: CreateUserDto) {
    return new Promise(async (resolve) => {
      // Get model
      const newUser = new this.userModel(payload);

      // Hashing password
      const hashPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashPassword;

      // Save Model
      const savedUser = await newUser.save();

      // Return excluding password
      const { password, ...rta } = savedUser.toJSON();
      resolve(rta);
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
