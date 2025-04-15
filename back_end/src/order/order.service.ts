import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetailService } from './order_detail/order_detail.service';
import { CheckOrderStatusDto } from './order_detail/dto/check-order-status.dto';

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
  ): Promise<{ success: boolean; message: string; data: Order }> {
    const {
      note,
      order_details,
      address_id,
      discount_id,
      payment_method,
      final_price,
    }: CreateOrderDto = createOrderDto;
    const exitsOrder = await this.orderRepository.findOne({
      where: {
        user: { id: userId },
        status: 'PENDING',
      },
    });
    if (!exitsOrder) {
    }
    // Tạo order_code ngay từ đầu (có thể dùng timestamp hoặc uuid)
    const tempOrderCode = `TEMP-${Date.now()}`;

    // Tạo đơn hàng
    const order = this.orderRepository.create({
      total_price: 0,
      note,
      payment_method,
      final_price,
      order_code: tempOrderCode,
      user: { id: userId },
      address: { id: address_id },
      discount: discount_id ? { id: discount_id } : undefined,
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

    const orderCode = `DH${savedOrder.id}`;

    // Lưu tổng giá vào order
    await this.orderRepository.update(savedOrder.id, {
      order_code: orderCode,
      total_price: orderDetail.total_price,
    });

    const newOrder = await this.orderRepository.findOne({
      where: { id: savedOrder.id },
    });
    return {
      success: true,
      message: 'Tạo đơn hàng thành công',
      data: newOrder!,
    };
  }

  async checkPaymentStatus(order_code, userId: number) {
    if (!/^DH\d+$/.test(order_code)) {
      throw new BadRequestException(
        'Mã đơn hàng không hợp lệ. Phải có định dạng DH + số ID',
      );
    }

    const exitsOrder = await this.orderRepository.findOne({
      where: {
        user: { id: userId },
        order_code: order_code,
      },
    });
    if (!exitsOrder) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }
    return {
      success: true,
      message: 'Đơn hàng tổn tại',
      data: {
        payment_status: exitsOrder.payment_status,
      },
    };
  }

  async checkExitsOrder(
    userId: number,
  ): Promise<{ exits: boolean; orderId?: number }> {
    const exitsOrder = await this.orderRepository.findOne({
      where: {
        user: { id: userId },
        status: 'PENDING',
      },
    });

    return exitsOrder
      ? { exits: true, orderId: exitsOrder.id }
      : { exits: false };
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userId: number) {
    // Cập nhật order details thông qua OrderDetailService
    const {
      order_details,
      note,
      discount_id,
      final_price,
      payment_method,
      address_id,
    } = updateOrderDto;
    const order = await this.orderRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    if (!order_details || order_details.length === 0) {
      return {
        success: false,
        message: 'Không có chi tiết sản phẩm nào để cập nhật',
      };
    }

    const { total_price } = await this.orderDetailService.update(
      id,
      order_details,
    );

    updateOrderDto.updated_at = new Date();
    await this.orderRepository.update(id, {
      discount: { id: discount_id },
      final_price,
      note,
      payment_method,
      address: { id: address_id },
      total_price: total_price,
    });

    const newOrder = await this.orderRepository.findOne({
      where: { id },
    });

    return {
      success: true,
      message: 'Tạo đơn hàng thành công',
      data: newOrder,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
  async getAllOrder() {
    // const orders = await this.orderRepository.
  }
}
