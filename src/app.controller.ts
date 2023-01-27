import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard';

// Guard protect all controllers
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // Endpoint access protected by guard
  // @UseGuards(ApiKeyGuard)
  @Get('/tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
