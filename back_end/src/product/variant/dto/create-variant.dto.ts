import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CreateVariantItemDto } from './varient-item.dto';
import { Type } from 'class-transformer';

export class CreateVariantDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Cần ít nhất một biến thể' })
  @ValidateNested({ each: true })
  @Type(() => CreateVariantItemDto)
  variants: CreateVariantItemDto[];

  @IsNotEmpty()
  @IsInt({ message: 'Mã sản phẩm phải là số nguyên' })
  product_id: number;
}
