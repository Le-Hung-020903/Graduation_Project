import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { Product } from '../entities/product.entity';
import { Unit } from '../unit/entities/unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Variant]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Unit]),
  ],
  controllers: [VariantController],
  providers: [VariantService],
  exports: [VariantService],
})
export class VariantModule {}
