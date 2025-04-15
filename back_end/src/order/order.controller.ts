import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public } from 'src/Decorator/auth.decorator';
import { CheckOrderStatusDto } from './order_detail/dto/check-order-status.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const userId: number = req.user?.id;
    return this.orderService.create(createOrderDto, userId);
  }

  @Public()
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('check_status/:order_code')
  checkPaymentStatus(@Param('order_code') order_code: string, @Req() req) {
    const userId: number = req.user?.id;
    return this.orderService.checkPaymentStatus(order_code, userId);
  }

  @Get('check_exits_order')
  checkExitsOrder(@Req() req) {
    const userId: number = req.user?.id;
    return this.orderService.checkExitsOrder(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req,
  ) {
    const userId: number = req.user?.id;
    return this.orderService.update(+id, updateOrderDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Get('get_all')
  getAllOrder(@Req() req) {
    const userId: number = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Bạn cần phải đăng nhập');
    }
    return this.orderService.getAllOrder();
  }
}
