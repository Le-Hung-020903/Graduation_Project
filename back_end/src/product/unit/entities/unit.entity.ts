import { Variant } from 'src/product/variant/entities/variant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'units' })
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  symbol: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;

  // Một đơn vị có thể được sử dụng cho nhiều biến thể
  @OneToMany(() => Variant, (variant) => variant.unit)
  variants: Variant[];
}
