import { Module } from '@nestjs/common';
import { FavoriteProductService } from './favorite_product.service';
import { FavoriteProductController } from './favorite_product.controller';

@Module({
  controllers: [FavoriteProductController],
  providers: [FavoriteProductService],
})
export class FavoriteProductModule {}
