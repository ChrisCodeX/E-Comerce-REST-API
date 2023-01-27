import { Injectable, NotFoundException } from '@nestjs/common';
// Mongo injection
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  // Product Schema injection
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};

      const { limit = 10, offset = 0 } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = {
          $gte: minPrice,
          $lte: maxPrice,
        };
      }
      return await this.productModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        // Resolve join to brand by id reference
        .populate('brand')
        .exec();
    }
    return await this.productModel.find().populate('brand').exec();
  }

  async findOne(productId: string) {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException(`product #${productId} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return await newProduct.save();
  }

  async update(productId: string, changes: UpdateProductDto) {
    const product = await this.productModel
      .findOneAndUpdate(
        {
          _id: productId,
        },
        {
          $set: changes,
        },
        {
          new: true,
        },
      )
      .exec();
    if (!product) {
      throw new NotFoundException(`product ${productId} not found`);
    }
    return product;
  }

  async remove(productId: string) {
    const productDeleted = await this.productModel.findByIdAndDelete(productId);
    if (!productDeleted) {
      throw new NotFoundException(`product ${productId} not found`);
    }
    return productDeleted;
  }
}
