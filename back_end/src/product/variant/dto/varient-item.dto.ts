import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateVariantItemDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 40, {
    message: 'Tên phải có ít nhất 2 và tối đa 40 ký tự!',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  litre?: number;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsInt({ message: 'Mã đơn vị phải là số nguyên' })
  unit_id: number;
}
