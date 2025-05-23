import { Module } from '@nestjs/common';
import { CartProductService } from './cart_product.service';
import { CartProductController } from './cart_product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../entities/cart.entity';
import { CartProduct } from './entities/cart_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartProduct])],
  controllers: [CartProductController],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
