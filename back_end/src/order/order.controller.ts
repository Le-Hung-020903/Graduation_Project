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
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public } from 'src/Decorator/auth.decorator';
import { CheckOrderStatusDto } from './order_detail/dto/check-order-status.dto';
import { UpdateStatusOrder } from './dto/update-status-order';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const userId: number = req.user?.id;
    return this.orderService.create(createOrderDto, userId);
  }

  @Get()
  findAll(@Query('status') status = 'All', @Req() req) {
    const userId: number = req.user?.id;
    return this.orderService.findAll(userId, status);
  }

  @Get('check_status/:order_code')
  checkPaymentStatus(
    @Param('order_code') order_code: CheckOrderStatusDto,
    @Req() req,
  ) {
    const userId: number = req.user?.id;
    return this.orderService.checkPaymentStatus(order_code, userId);
  }

  @Get('check_exits_order')
  checkExitsOrder(@Req() req) {
    const userId: number = req.user?.id;
    return this.orderService.checkExitsOrder(userId);
  }

  @Get('get_all')
  getAllOrder(
    @Req() req,
    @Query()
    query: { _page: string; _limit: string; _sort: string; _status: string },
  ) {
    const { _page = 1, _limit = 5, _sort = '', _status = '' } = query;
    const userId: number = req.user?.id;
    return this.orderService.getAllOrder(
      userId,
      Number(_page),
      Number(_limit),
      _sort.toUpperCase() as 'ASC' | 'DESC',
      _status,
    );
  }

  @Patch('update_status/:id')
  updateStatus(
    @Body() Body: UpdateStatusOrder,
    @Param('id') id: string,
    @Req() req,
  ) {
    const userId: number = req.user?.id;
    return this.orderService.updateStatus(Body, +id, userId);
  }
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const userId: number = req.user?.id;
    return this.orderService.findOne(+id, userId);
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
}
