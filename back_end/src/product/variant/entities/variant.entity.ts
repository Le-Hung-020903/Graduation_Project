import { OrderDetail } from 'src/order/order_detail/entities/order_detail.entity';
import { Product } from 'src/product/entities/product.entity';
import { Unit } from 'src/product/unit/entities/unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'variants' })
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  sku: string;

  @Column()
  stock: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  litre: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;

  // Một biến thể thuộc về một sản phẩm
  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  // Một biến thể có một đơn vị đo lường
  @ManyToOne(() => Unit, (unit) => unit.variants)
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.variant)
  orderDetails: OrderDetail[];
}
