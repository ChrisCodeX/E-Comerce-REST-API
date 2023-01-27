import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

/* This is a pipe customized */
// import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';

// Product Service import
import { ProductsService } from 'src/products/services/products.service';

// Products Dto import
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  /* Get Methods */
  @HttpCode(HttpStatus.ACCEPTED)
  @Get()
  async getProducts(@Query() params: FilterProductsDto) {
    const rta = await this.productService.findAll(params);
    return {
      message: rta,
    };
  }

  @Get('/:productId')
  async getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return {
      message: await this.productService.findOne(productId),
    };
  }

  /* Post Methods */
  @Post()
  async create(@Body() payload: CreateProductDto) {
    const newProduct = await this.productService.create(payload);
    return {
      message: 'created',
      newProduct,
    };
  }

  /* Patch Methods */
  @Patch('/:id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    const product = await this.productService.update(id, payload);
    return {
      message: 'updated',
      payload: {
        product,
      },
    };
  }

  /* Deleted Methods */
  @Delete('/:id')
  async delete(@Param('id', MongoIdPipe) id: string) {
    return await this.productService.remove(id);
  }
}
