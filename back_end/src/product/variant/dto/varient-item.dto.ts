import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateVariantItemDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30, {
    message: 'Tên phải có ít nhất 2 và tối đa 30 ký tự!',
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
