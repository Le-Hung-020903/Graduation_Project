import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetailService } from './order_detail/order_detail.service';
import { CheckOrderStatusDto } from './order_detail/dto/check-order-status.dto';
import { UpdateStatusOrder } from './dto/update-status-order';
import { CreateOrderByAdmin } from './dto/create-order-admin.dto';

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
    // Tạo order_code ngay từ đầu (có thể dùng timestamp hoặc uuid)
    const tempOrderCode = `TEMP-${Date.now()}`;

    // Tạo đơn hàng
    const order = this.orderRepository.create({
      total_price: 0,
      note,
      payment_method,
      final_price,
      order_code: tempOrderCode,
      status: payment_method === 'COD' ? 'WAITING_CONFIRMATION' : 'PENDING',
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

  async createOrderByAdmin(createOrderByAdminDto: CreateOrderByAdmin) {
    const {
      note,
      order_details,
      address_id,
      discount_id,
      payment_method,
      final_price,
      status,
      user_id,
      payment_status,
    }: CreateOrderByAdmin = createOrderByAdminDto;
    // Tạo order_code ngay từ đầu (có thể dùng timestamp hoặc uuid)
    const tempOrderCode = `TEMP-${Date.now()}`;

    // Tạo đơn hàng
    const order = this.orderRepository.create({
      total_price: 0,
      note,
      payment_method,
      final_price,
      order_code: tempOrderCode,
      status: status,
      user: { id: user_id },
      address: { id: address_id },
      discount: discount_id ? { id: discount_id } : undefined,
      payment_status: payment_status,
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

  async checkPaymentStatus(order_code: string, userId: number) {
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

  async findAll(userId: number, status: string) {
    if (!userId) {
      throw new UnauthorizedException('Bạn cần phải đăng nhập');
    }

    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.orderDetails', 'orderDetail')
      .leftJoin('orderDetail.product', 'product')
      .leftJoin('product.images', 'image')
      .leftJoin('orderDetail.variant', 'variant')
      .where('order.user_id = :userId', { userId })
      .orderBy('order.created_at', 'DESC')
      .select([
        'order.id',
        'order.status',
        'order.final_price',
        'order.created_at',
        'orderDetail.id',
        'product.name',
        'image.id',
        'image.url',
        'variant.name',
      ]);

    if (status && status !== 'All') {
      query.andWhere('order.status = :status', { status });
    }
    const orders = await query.getMany();

    const result = orders.map((order) => {
      const firstDetail = order.orderDetails?.[0];
      const moreProducts = order.orderDetails.length - 1;
      return {
        id: order.id,
        status: order.status,
        final_price: order.final_price,
        created_at: order.created_at,
        product: {
          name: firstDetail?.product?.name,
          images: {
            url: firstDetail?.product?.images?.[0]?.url,
          },
          variant: {
            name: firstDetail?.variant?.name,
          },
        },
        more: moreProducts > 0 ? `+${moreProducts} sản phẩm khác` : null,
      };
    });
    return {
      success: true,
      message: 'Lấy danh sách đơn hàng thành công',
      data: result,
    };
  }

  async findOne(
    id: number,
    userId: number,
  ): Promise<{ success: boolean; message: string; data: Order }> {
    if (!userId) {
      throw new UnauthorizedException('Bạn cần phải đăng nhập');
    }

    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.address', 'address')
      .leftJoinAndSelect('orderDetail.product', 'product')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('orderDetail.variant', 'variant')
      .where('order.id = :id', { id }) // lọc theo order id
      .andWhere('order.user_id = :userId', { userId }) // đảm bảo là đơn của user đó
      .select([
        'order.id',
        'order.status',
        'order.note',
        'order.total_price',
        'order.final_price',
        'order.payment_method',
        'order.created_at',
        'order.order_code',
        'order.discount_id',
        'orderDetail.id',
        'orderDetail.quantity',
        'product.id',
        'product.name',
        'user.email',
        'image.id',
        'image.url',
        'variant.id',
        'variant.name',
        'variant.price',
        'address.name',
        'address.phone',
        'address.province',
        'address.district',
        'address.ward',
        'address.is_default',
        'address.street',
      ])
      .getOne();

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
    return {
      success: true,
      message: 'Lấy thông tin đơn hàng thành công',
      data: order,
    };
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

  async getAllOrder(
    userId: number,
    page: number,
    limit: number,
    sort: 'ASC' | 'DESC' = 'DESC',
    status?: string,
  ) {
    if (!userId) {
      throw new UnauthorizedException('Bạn cần phải đăng nhập');
    }
    const skip = (page - 1) * limit;
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.orderDetails', 'orderDetail')
      .leftJoin('orderDetail.product', 'product')
      .leftJoin('product.images', 'image')
      .leftJoin('order.address', 'address')
      .leftJoin('orderDetail.variant', 'variant')
      .orderBy('order.created_at', sort)
      .skip(skip)
      .take(limit)
      .select([
        'order.id',
        'order.status',
        'order.payment_method',
        'order.order_code',
        'order.final_price',
        'order.created_at',
        'orderDetail.id',
        'address.name',
        'product.name',
        'image.id',
        'image.url',
        'variant.name',
      ]);

    if (status && status !== 'All') {
      query.where('order.status = :status', { status });
    }

    const [orders, total] = await query.getManyAndCount();

    const result = orders.map((order) => {
      const firstDetail = order.orderDetails?.[0];
      const moreProducts = order.orderDetails.length - 1;
      return {
        id: order.id,
        status: order.status,
        order_code: order.order_code,
        payment_method: order.payment_method,
        final_price: order.final_price,
        name: order?.address?.name,
        product: {
          name: firstDetail?.product?.name,
          images: {
            url: firstDetail?.product?.images?.[0]?.url,
          },
          variant: {
            name: firstDetail?.variant?.name,
          },
        },
        more: moreProducts > 0 ? `+${moreProducts} sản phẩm khác` : null,
      };
    });

    return {
      success: true,
      message: 'Lấy danh sách đơn hàng thành công',
      data: result,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateStatus(
    Body: UpdateStatusOrder,
    orderId: number,
    userId: number,
  ): Promise<{ success: boolean; message: string; data: Order }> {
    if (!userId) throw new UnauthorizedException('Vui lòng đăng nhập');
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException('Đơn hàng không tồn tại');

    await this.orderRepository.update(orderId, {
      note: Body.note,
      status: Body.status,
      address: { id: Body.address_id },
    });

    const newOrder = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.address', 'address')
      .leftJoinAndSelect('orderDetail.product', 'product')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('orderDetail.variant', 'variant')
      .where('order.id = :orderId', { orderId }) // lọc theo order id
      .andWhere('order.user_id = :userId', { userId }) // đảm bảo là đơn của user đó
      .select([
        'order.id',
        'order.status',
        'order.note',
        'order.total_price',
        'order.final_price',
        'order.payment_method',
        'order.created_at',
        'order.order_code',
        'order.discount_id',
        'orderDetail.id',
        'orderDetail.quantity',
        'product.id',
        'product.name',
        'user.email',
        'image.id',
        'image.url',
        'variant.id',
        'variant.name',
        'variant.price',
        'address.name',
        'address.phone',
        'address.province',
        'address.district',
        'address.ward',
        'address.is_default',
        'address.street',
      ])
      .getOne();
    if (!newOrder)
      throw new NotFoundException('Không tìm thấy đơn hàng sau khi cập nhật');

    return {
      success: true,
      message: 'Cập nhật đơn hàng thành công',
      data: newOrder,
    };
  }

  async findOneByAdmin(id: number): Promise<{
    success: boolean;
    message: string;
    data: Order;
  }> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.address', 'address')
      .leftJoinAndSelect('orderDetail.product', 'product')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('orderDetail.variant', 'variant')
      .where('order.id = :id', { id }) // lọc theo order id
      .select([
        'order.id',
        'order.status',
        'order.note',
        'order.total_price',
        'order.final_price',
        'order.payment_method',
        'order.created_at',
        'order.order_code',
        'order.discount_id',
        'orderDetail.id',
        'orderDetail.quantity',
        'product.id',
        'product.name',
        'user.email',
        'image.id',
        'image.url',
        'variant.id',
        'variant.name',
        'variant.price',
        'address.name',
        'address.phone',
        'address.province',
        'address.district',
        'address.ward',
        'address.is_default',
        'address.street',
      ])
      .getOne();

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
    return {
      success: true,
      message: 'Lấy thông tin đơn hàng thành công',
      data: order,
    };
  }
}
