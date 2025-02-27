import {
  // ArrayMinSize,
  // IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateProductImageDto {
  // @IsArray({ message: 'Danh sách hình ảnh phải là một mảng!' })
  // @ArrayMinSize(1, { message: 'Ít nhất phải có 1 hình ảnh!' })
  // @IsString({ each: true, message: 'Mỗi URL hình ảnh phải là chuỗi!' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i, {
    // each: true, // Áp dụng kiểm tra với từng phần tử trong mảng
    message: 'Link hình ảnh không hợp lệ!',
  })
  url: string;

  @IsNotEmpty()
  @IsInt({ message: 'ID sản phẩm phải là số nguyên!' })
  product_id: number;
}
