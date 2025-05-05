import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDetailDto } from '../order_detail/dto/create-order_detail.dto';

export class CreateOrderByAdmin extends PartialType(CreateOrderDto) {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsEnum(
    [
      'PENDING',
      'WAITING_CONFIRMATION',
      'SHIPPED',
      'DELIVERED',
      'CANCELED',
      'CONFIRMED',
    ],
    { message: 'Trạng thái đơn hàng không hợp lệ' },
  )
  status: string;

  @IsNotEmpty()
  @IsEnum(['UNPAID', 'PAID', 'CANCELLED', 'REFUNDED'], {
    message: 'Trạng thái thanh toán không hợp lệ',
  })
  payment_status: string;

  @IsNotEmpty()
  @IsArray({ message: 'Danh sách sản phẩm phải là một mảng' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  order_details: CreateOrderDetailDto[];
}
