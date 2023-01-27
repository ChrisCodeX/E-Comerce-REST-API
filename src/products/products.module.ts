import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BrandsController } from './controllers/brands.controller';
import { ProductsController } from './controllers/products.controller';
import { BrandsService } from './services/brands.service';
import { ProductsService } from './services/products.service';
import { ProductSchema, Product } from 'src/products/entities/product.entity';
import { Brand, BrandSchema } from './entities/brand.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [ProductsController, BrandsController],
  providers: [ProductsService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
