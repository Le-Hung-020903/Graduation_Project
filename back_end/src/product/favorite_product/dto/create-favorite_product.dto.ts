import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateFavoriteProductDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(2, { message: 'mã sản pẩm phải lớn hơn 1' })
  product_id: number;
}
