import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ingredients' })
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  info: string;

  // Định nghĩa khóa ngoại với tên cột cụ thể
  @ManyToOne(() => Product, (product) => product.ingredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' }) // Đặt tên cột khóa ngoại là 'product_id'
  product: Product;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;
}
