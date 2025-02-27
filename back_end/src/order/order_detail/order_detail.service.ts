import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDeatailsRepository: Repository<OrderDetail>,
  ) {}
  async create(createOrderDetailDto: CreateOrderDetailDto[]): Promise<{
    success: boolean;
    message: string;
    total_price: number;
  }> {
    let total_price = 0;
    await Promise.all(
      createOrderDetailDto.map(async (item) => {
        const orderDetailInstance = this.orderDeatailsRepository.create({
          quantity: item.quantity,
          price: item.price,
          order: { id: item.order_id },
          product: { id: item.product_id },
          variant: { id: item.variant_id },
        });
        total_price += item.quantity * item.price;
        return this.orderDeatailsRepository.save(orderDetailInstance);
      }),
    );
    return {
      success: true,
      message: 'Tạo chi tiết đơn hàng thành công',
      total_price,
    };
  }

  findAll() {
    return `This action returns all orderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
