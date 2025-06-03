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
import { CreateOrderByAdmin } from './dto/create-order-admin.dto';
import { Permissions } from 'src/Decorator/roles.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const userId: number = req.user?.id;
    return this.orderService.create(createOrderDto, userId);
  }

  @Permissions('orders.insert')
  @Post('create_order_by_admin')
  createOrderByAdmin(@Body() createOrderByAdminDto: CreateOrderByAdmin) {
    return this.orderService.createOrderByAdmin(createOrderByAdminDto);
  }

  @Get()
  findAll(@Query('status') status = 'All', @Req() req) {
    const userId: number = req.user?.id;
    return this.orderService.findAll(userId, status);
  }

  @Get('check_status/:order_code')
  checkPaymentStatus(
    //  Nếu dùng dto thì bên trong params k có gì
    @Param() params: CheckOrderStatusDto,
    @Req() req,
  ) {
    const userId: number = req.user?.id;
    const orderCode: string = params.order_code;
    return this.orderService.checkPaymentStatus(orderCode, userId);
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

  @Public()
  @Get('get_order_by_admin/:id')
  findOneByAdmin(@Param('id') id: string) {
    return this.orderService.findOneByAdmin(+id);
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

  @Permissions('orders.delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
