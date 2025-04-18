import { Module } from '@nestjs/common';
import { FavoriteProductService } from './favorite_product.service';
import { FavoriteProductController } from './favorite_product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProduct } from './entities/favorite_product.entity';
import { Product } from '../entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteProduct, Product, User])],
  controllers: [FavoriteProductController],
  providers: [FavoriteProductService],
})
export class FavoriteProductModule {}
