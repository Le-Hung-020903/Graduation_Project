import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UnitModule } from './unit/unit.module';
import { VariantModule } from './variant/variant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { IngredientModule } from './ingredient/ingredient.module';
import { ProductImageModule } from './product_image/product_image.module';
import { CategoryModule } from 'src/category/category.module';
import { ManufacturerModule } from 'src/manufacturer/manufacturer.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    VariantModule,
    UnitModule,
    IngredientModule,
    ProductImageModule,
    CategoryModule,
    ManufacturerModule,
    CloudinaryModule,
    VariantModule,
    IngredientModule,
  ],
})
export class ProductModule {}
