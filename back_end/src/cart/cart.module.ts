import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartProductModule } from './cart_product/cart_product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { BlackListModule } from 'src/black-list/black-list.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserModule } from 'src/user/user.module';
import { CartProduct } from './cart_product/entities/cart_product.entity';

@Module({
  controllers: [CartController],
  providers: [CartService, AuthGuard],
  imports: [
    TypeOrmModule.forFeature([Cart, User, CartProduct]),
    CartProductModule,
    BlackListModule,
    UserModule,
  ],
})
export class CartModule {}
