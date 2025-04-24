import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from '../order_detail/entities/order_detail.entity';
import { Discount } from 'src/discount/entities/discount.entity';
import { Address } from 'src/user/address/entities/address.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_price: number;

  @Column()
  final_price: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({
    type: 'enum',
    enum: [
      'PENDING',
      'WAITING_CONFIRMATION',
      'SHIPPED',
      'DELIVERED',
      'CANCELED',
      'CONFIRMED',
    ],
    default: 'PENDING',
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['COD', 'QR_PAYMENT'],
    default: 'COD',
  })
  payment_method: string;

  @Column({ unique: true })
  order_code: string;

  @Column({
    type: 'enum',
    enum: ['UNPAID', 'PAID', 'CANCELLED', 'REFUNDED'],
    default: 'UNPAID',
  })
  payment_status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' }) // Xóa user thì xóa luôn order
  @JoinColumn({ name: 'user_id' }) // Tạo khóa ngoại `user_id`
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
  })
  orderDetails: OrderDetail[];

  // Mỗi Order chỉ có thể áp dụng 1 Discount
  @ManyToOne(() => Discount, (discount) => discount.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;

  @ManyToOne(() => Address, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
