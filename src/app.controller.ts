import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(@Request() req): string {
    console.log(req.user);
    return this.appService.getHello();
  }

  @Get('1')
  getHello1(@Request() req): string {
    console.log(req.user);
    return this.appService.getHello() + '1';
  }
}
