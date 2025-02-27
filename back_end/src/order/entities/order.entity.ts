import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from '../order_detail/entities/order_detail.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_price: number;

  @Column()
  recipient_name: string;

  @Column()
  recipient_phone: string;

  @Column()
  shipping_address: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELED', 'CONFIRMED'],
    default: 'PENDING',
  })
  status: string;

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
}
