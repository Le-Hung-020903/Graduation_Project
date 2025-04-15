import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { IngredientItemDto } from './ingredient.item.dto';
import { Type } from 'class-transformer';

export class CreateIngredientDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Cần ít nhất một nguyên liệu' })
  @ValidateNested({ each: true })
  @Type(() => IngredientItemDto)
  ingredients: IngredientItemDto[];

  @IsNotEmpty()
  @IsInt({ message: 'ID sản phẩm phải là số nguyên!' })
  product_id: number;
}
