import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetailService } from './order_detail/order_detail.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderDetailService: OrderDetailService,
  ) {}
  async create(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<{ success: boolean; message: string }> {
    const {
      recipient_name,
      recipient_phone,
      shipping_address,
      note,
      order_details,
    }: CreateOrderDto = createOrderDto;

    // Tạo đơn hàng
    const order = this.orderRepository.create({
      total_price: 0,
      recipient_name,
      recipient_phone,
      shipping_address,
      note,
      user: { id: userId },
    });

    const savedOrder = await this.orderRepository.save(order);

    // Gán order_id cho từng order_detail trước khi gửi đi
    const orderDeatailsWithOrderId = order_details.map((item) => ({
      ...item,
      order_id: savedOrder.id,
    }));

    // Gửi danh sách order_details với order_id đã được gán
    const orderDetail = await this.orderDetailService.create(
      orderDeatailsWithOrderId,
    );

    // Lưu tổng giá vào order
    await this.orderRepository.update(order.id, {
      total_price: orderDetail.total_price,
    });
    return {
      success: true,
      message: 'Tạo đơn hàng thành công',
    };
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
  async getAllOrder() {
    // const orders = await this.orderRepository.
  }
}
