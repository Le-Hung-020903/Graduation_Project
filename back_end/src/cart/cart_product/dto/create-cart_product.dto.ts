import { IsInt, IsNotEmpty, Min } from 'class-validator';
export class CreateCartProductDto {
  @IsNotEmpty()
  @IsInt({ message: 'Số lượng phải là số nguyên' })
  @Min(1, { message: 'Số lượng phải lớn hơn 0' })
  quantity: number;

  @IsNotEmpty()
  @Min(0, { message: 'Giá không được nhỏ hơn 0' })
  price: number;

  @IsNotEmpty()
  @IsInt({ message: 'Mã người dùng phải là số nguyên' })
  product_id: number;

  @IsNotEmpty()
  @IsInt({ message: 'Mã người dùng phải là số nguyên' })
  cart_id: number;

  @IsNotEmpty()
  @IsInt({ message: 'Mã người dùng phải là số nguyên' })
  variant_id: number;
}
