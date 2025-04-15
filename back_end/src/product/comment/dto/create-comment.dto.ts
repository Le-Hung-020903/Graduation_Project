import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Đánh giá phải là số' })
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  parent_id?: number;

  @IsNumber({}, { message: 'mã sản phẩm phải là số' })
  @Min(1, { message: 'mã sản phẩm phải lớn hơn 0' })
  @IsNotEmpty()
  product_id: number;
}
