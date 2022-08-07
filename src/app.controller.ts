import { Controller, Request, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(@Request() req): string {
    Logger.log('HELLOW')
    return this.appService.getHello();
  }
}
