import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateProductImageDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i, {
    message: 'Link hình ảnh không hợp lệ!',
  })
  url: string;

  @IsNotEmpty()
  @IsInt({ message: 'ID sản phẩm phải là số nguyên!' })
  product_id: number;
}
