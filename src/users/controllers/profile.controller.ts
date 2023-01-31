import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles.models';
import { PayloadToken } from 'src/auth/models/token.models';
import { OrdersService } from '../services/orders.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  async getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return await this.orderService.ordersByCustomer(user.sub);
  }
}
