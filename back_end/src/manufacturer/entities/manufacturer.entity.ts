import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'manufacturers' })
export class Manufacturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

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

  @OneToMany(() => Product, (product) => product.manufacturer)
  products: Product[];

  @OneToMany(() => Inventory, (inventory) => inventory.manufacturer)
  inventories: Inventory[];
}
