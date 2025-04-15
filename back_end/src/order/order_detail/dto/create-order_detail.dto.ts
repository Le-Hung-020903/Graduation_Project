import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
export class CreateOrderDetailDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsInt({ message: 'số lượng phải là số dương' })
  @Min(1, { message: 'Số lượng phải lớn hơn 0' })
  quantity: number;

  @IsNotEmpty()
  @Min(1, { message: 'Giá phải lớn hơn 0' })
  price: number;

  @IsOptional()
  @IsInt({ message: 'Mã đơn hàng phải là số dương' })
  @Min(1, { message: 'Số lượng phải lớn hơn 0' })
  order_id?: number;

  @IsNotEmpty()
  @IsInt({ message: 'Mã sản phẩm phải là số dương' })
  @Min(1, { message: 'Mã sản phẩm phải lớn hơn 0' })
  product_id: number;

  @IsNotEmpty()
  @IsInt({ message: 'Mã biến thể phải là số dương' })
  @Min(1, { message: 'Mã biến thể phải lớn hơn 0' })
  variant_id: number;
}
