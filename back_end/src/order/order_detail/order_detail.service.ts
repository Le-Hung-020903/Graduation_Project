import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { In, Repository } from 'typeorm';

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
    // Tính tổng tiền trước khi lưu
    const total_price = createOrderDetailDto.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    // Tạo danh sách orderDetails trước khi lưu
    const orderDetails = createOrderDetailDto.map((item) =>
      this.orderDeatailsRepository.create({
        quantity: item.quantity,
        price: item.price,
        order: { id: item.order_id },
        product: { id: item.product_id },
        variant: { id: item.variant_id },
      }),
    );

    // Lưu tất cả orderDetails trong một truy vấn duy nhất
    await this.orderDeatailsRepository.save(orderDetails);

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

  async update(
    orderId: number,
    updateOrderDetailDto: UpdateOrderDetailDto[],
  ): Promise<{ success: boolean; message: string; total_price: number }> {
    // 1️⃣ Lấy danh sách orderDetails hiện tại
    const existingOrderDetails = await this.orderDeatailsRepository.find({
      where: { order: { id: orderId } },
      relations: ['product', 'variant'],
    });

    console.log('🟢 Existing Order Details:', existingOrderDetails);

    // 2️⃣ Tạo Map từ danh sách hiện tại (Key = `${product_id}-${variant_id}`)
    const existingMap = new Map(
      existingOrderDetails.map((item) => [
        `${item.product?.id}-${item.variant?.id ?? 'no-variant'}`,
        item,
      ]),
    );

    // 3️⃣ Xác định các phần tử cần cập nhật, thêm mới và xóa
    const updates: UpdateOrderDetailDto[] = [];
    const inserts: UpdateOrderDetailDto[] = [];
    const existingKeys = new Set(existingMap.keys());
    const updatedKeys = new Set<string>();

    for (const item of updateOrderDetailDto) {
      const key = `${item.product_id}-${item.variant_id ?? 'no-variant'}`;
      updatedKeys.add(key);
      const existingItem = existingMap.get(key);

      if (existingItem) {
        // ✅ Nếu product_id đã có → Cập nhật nếu có thay đổi
        if (
          existingItem.quantity !== item.quantity ||
          existingItem.price !== item.price ||
          existingItem.variant?.id !== item.variant_id
        ) {
          updates.push({
            id: existingItem.id,
            order_id: orderId,
            product_id: item.product_id,
            variant_id: item.variant_id,
            quantity: item.quantity,
            price: item.price,
          });
        }
      } else {
        // ✅ Nếu không có thì thêm mới
        inserts.push({
          order_id: orderId,
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          price: item.price,
        });
      }
    }

    // 4️⃣ Xoá sản phẩm không có trong danh sách cập nhật
    const keysToDelete = [...existingKeys].filter(
      (key) => !updatedKeys.has(key),
    );
    if (keysToDelete.length > 0) {
      await this.orderDeatailsRepository.delete({
        order: { id: orderId },
        product: {
          id: In(keysToDelete.map((key) => Number(key.split('-')[0]))),
        },
      });
    }

    console.log('✅ Updates:', updates);
    console.log('✅ Inserts:', inserts);

    // 5️⃣ Cập nhật orderDetails
    for (const item of updates) {
      await this.orderDeatailsRepository.update(Number(item.id), {
        variant: item.variant_id ? { id: item.variant_id } : undefined,
        quantity: item.quantity,
        price: item.price,
        updated_at: new Date(),
      });
    }

    // 6️⃣ Thêm mới orderDetails
    if (inserts.length) {
      await this.orderDeatailsRepository.save(
        inserts.map((item) => ({
          order: { id: item.order_id },
          product: { id: item.product_id },
          variant: item.variant_id ? { id: item.variant_id } : undefined,
          quantity: item.quantity,
          price: item.price,
        })),
      );
    }

    // 7️⃣ Tính tổng giá tiền mới
    const total_price = updateOrderDetailDto.reduce(
      (sum, item) => sum + item.quantity! * item.price!,
      0,
    );

    return {
      success: true,
      message: 'Cập nhật chi tiết đơn hàng thành công',
      total_price,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
