import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll() {
    return new Promise(async (resolve) => {
      const brands = await this.brandModel.find().exec();
      resolve(brands);
    });
  }

  async findOne(brandId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const brand = await this.brandModel.findById(brandId).exec();
        if (!brand) {
          throw new NotFoundException(`brand #${brandId} not found`);
        }
        resolve(brand);
      } catch (error) {
        reject(error);
      }
    });
  }

  async create(payload: CreateBrandDto) {
    return new Promise(async (resolve, reject) => {
      const newBrand = new this.brandModel(payload);
      resolve(await newBrand.save());
    });
  }

  async update(brandId: string, changes: UpdateBrandDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const brand = await this.brandModel
          .findOneAndUpdate(
            {
              _id: brandId,
            },
            {
              $set: changes,
            },
            {
              new: true,
            },
          )
          .exec();
        if (!brand) {
          throw new NotFoundException(`brand #${brandId} not found`);
        }
        resolve(brand);
      } catch (error) {
        reject(error);
      }
    });
  }

  async remove(brandId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedBrand = await this.brandModel.findByIdAndDelete(brandId);
        if (!deletedBrand) {
          throw new NotFoundException(`brand #${brandId} not found`);
        }
        resolve(deletedBrand);
      } catch (error) {
        reject(error);
      }
    });
  }
}
