import { PartialType } from '@nestjs/swagger';
import { CreateCartProductDto } from './create-cart_product.dto';
import { IsOptional } from 'class-validator';

export class UpdateCartProductDto extends PartialType(CreateCartProductDto) {
  @IsOptional()
  updated_at?: Date;
}
