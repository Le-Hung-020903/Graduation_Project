import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateOrderDetailDto } from '../order_detail/dto/create-order_detail.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  discount_id?: number;

  @IsNotEmpty()
  final_price: number;

  @IsNotEmpty({ message: 'Phương thức thanh toán không được để trống' })
  @IsString()
  @IsIn(['COD', 'QR_PAYMENT'], {
    message: 'Phương thức thanh toán chỉ được là COD hoặc QR_PAYMENT',
  })
  payment_method: string;

  @IsNotEmpty()
  @IsInt({ message: 'Mã địa chỉ phải là số dương' })
  @Min(1, { message: 'Mã địa chỉ phải lớn hơn 0' })
  address_id: number;

  @IsArray({ message: 'Danh sách sản phẩm phải là một mảng' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  order_details: CreateOrderDetailDto[];
}
