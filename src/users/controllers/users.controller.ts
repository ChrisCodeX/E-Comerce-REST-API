import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // Get all users
  @ApiOperation({ summary: 'List of all users' })
  @Get()
  async getUsers() {
    return {
      message: await this.userService.findAll(),
    };
  }

  // Get a user
  @Get('/:id')
  async getUser(@Param('id', MongoIdPipe) id: string) {
    return {
      message: await this.userService.findOne(id),
    };
  }

  // Create a user
  @Post()
  async create(@Body() payload: CreateUserDto) {
    return {
      message: 'created',
      payload: await this.userService.create(payload),
    };
  }

  // Update a user
  @Patch('/:id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return {
      message: 'updated',
      payload: await this.userService.update(id, payload),
    };
  }

  // Delete a user
  @Delete('/:id')
  async delete(@Param('id', MongoIdPipe) id: string) {
    return {
      message: 'deleted',
      payload: await this.userService.remove(id),
    };
  }
}
