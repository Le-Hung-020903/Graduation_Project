import { UserToken } from 'src/auth/entities/user_token.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { CommentPost } from 'src/post/comment_post/entities/comment_post.entity';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/product/comment/entities/comment.entity';
import { FavoriteProduct } from 'src/product/favorite_product/entities/favorite_product.entity';
import { Role } from 'src/rbac/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true }) // Có thể để trống, mặc định là false thì không được null
  address: string;

  @Column({ default: false })
  status: boolean;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true }) // Có thể để trống
  avatar: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;

  @OneToMany(() => UserToken, (userToken) => userToken.user, { cascade: true })
  tokens: UserToken[];

  @ManyToMany(() => Role, (role) => role.users, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @OneToOne(() => Cart, (cart) => cart.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orders: Order[];

  @OneToMany(() => FavoriteProduct, (favorite) => favorite.user, {
    cascade: true,
  })
  favorites: FavoriteProduct[];

  @OneToMany(() => Comment, (review) => review.user, {
    cascade: true,
  })
  reviews: Comment[];

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @OneToMany(() => CommentPost, (commentPost) => commentPost.user, {
    cascade: true,
  })
  comments: CommentPost[];
}
