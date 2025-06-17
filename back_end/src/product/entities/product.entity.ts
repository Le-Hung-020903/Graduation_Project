import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { ProductImage } from '../product_image/entities/product_image.entity';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Category } from 'src/category/entities/category.entity';
import { Variant } from '../variant/entities/variant.entity';
import { CartProduct } from 'src/cart/cart_product/entities/cart_product.entity';
import { OrderDetail } from 'src/order/order_detail/entities/order_detail.entity';
import { FavoriteProduct } from '../favorite_product/entities/favorite_product.entity';
import { Comment } from '../comment/entities/comment.entity';
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: 'text' })
  desc_html: string;

  @Column({ type: 'text' })
  desc_markdown: string;

  @Column({ type: 'timestamp', nullable: true })
  manufacture_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiry_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product, {
    cascade: true,
  }) // Khi xóa product, tự động xóa ingredients
  ingredients: Ingredient[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
  })
  images: ProductImage[];

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products, {
    onDelete: 'SET NULL', // Khi xóa manufacturer, product sẽ giữ giá trị NULL
  })
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // Một sản phẩm có nhiều biến thể
  @OneToMany(() => Variant, (variant) => variant.product, {
    cascade: true,
  })
  variants: Variant[];

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProducts: CartProduct[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => FavoriteProduct, (favorite) => favorite.product, {
    cascade: true,
  })
  favorites: FavoriteProduct[];

  @OneToMany(() => Comment, (review) => review.product, {
    cascade: true,
  })
  reviews: Comment[];
}
