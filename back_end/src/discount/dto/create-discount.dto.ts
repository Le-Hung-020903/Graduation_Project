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
  @Length(4, 20, {
    message: 'Tên phải có ít nhất 4 và tối đa 20 ký tự!',
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

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  end_date: Date;
}
