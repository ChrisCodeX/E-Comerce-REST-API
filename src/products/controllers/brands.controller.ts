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
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';

import { BrandsService } from 'src/products/services/brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  /* Get Methods */
  // Get all brands
  @Get()
  async getBrands() {
    return {
      message: await this.brandsService.findAll(),
    };
  }

  // Get a brand by id
  @Get('/:id')
  async getBrand(@Param('id', MongoIdPipe) id: string) {
    return {
      message: await this.brandsService.findOne(id),
    };
  }

  /* Post Methods */
  // Create a new brand
  @Post()
  async create(@Body() payload: CreateBrandDto) {
    return {
      message: await this.brandsService.create(payload),
    };
  }

  /* Patch Methods */
  // Update brand
  @Patch('/:id')
  async patch(@Param('id') id: string, @Body() payload: UpdateBrandDto) {
    return {
      message: await this.brandsService.update(id, payload),
    };
  }

  /* Delete Methods */
  // Delete a brand
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return {
      message: await this.brandsService.remove(id),
    };
  }
}
