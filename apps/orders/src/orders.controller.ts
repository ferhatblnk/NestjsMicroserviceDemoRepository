import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';
import { LoggingInterceptor } from '@app/common/utility/interceptors/logging-interceptor';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'cron-example',
    timeZone: 'Europe/Paris',
  })
  @Get()
  async getHello() {
    return this.ordersService.getHello();
  }
}
