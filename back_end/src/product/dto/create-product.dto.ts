import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { IngredientItemDto } from '../ingredient/dto/ingredient.item.dto';
import { CreateVariantItemDto } from '../variant/dto/varient-item.dto';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {
    message: 'Tên sản phẩm phải có ít nhất 3 và tối đa 20 ký tự!',
  })
  name: string;

  @IsNotEmpty()
  @IsInt({ message: 'Mã danh mục phải là số nguyên' })
  category_id: number;

  @IsNotEmpty()
  @IsInt({ message: 'Mã nhà sản xuất phải là số nguyên' })
  manufacturer_id: number;

  @IsString()
  desc: string;

  // @IsArray()
  // @ArrayMinSize(1, { message: 'Cần ít nhất một nguyên liệu' })
  // @ValidateNested({ each: true })
  // @Type(() => IngredientItemDto)
  // ingredients: IngredientItemDto[];

  @IsArray()
  @ArrayMinSize(1, { message: 'Cần ít nhất một biến thể' })
  @ValidateNested({ each: true })
  @Type(() => CreateVariantItemDto)
  variants: CreateVariantItemDto[];
}
