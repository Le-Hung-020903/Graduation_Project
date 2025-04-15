import { PartialType } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './create-order_detail.dto';
import { IsOptional } from 'class-validator';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {
  @IsOptional()
  updated_at?: Date;
}
