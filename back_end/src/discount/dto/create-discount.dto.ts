import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 40, {
    message: 'Tên phải có ít nhất 4 và tối đa 40 ký tự!',
  })
  content: string;

  @IsNotEmpty()
  @IsNumber(
    {},
    {
      message: 'Giá trị phải là một số nguyên!',
    },
  )
  percent: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 15, {
    message: 'Mã giảm giá phải có ít nhất 3 và tối đa 15 ký tự!',
  })
  code_discount: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  end_date: Date;
}
