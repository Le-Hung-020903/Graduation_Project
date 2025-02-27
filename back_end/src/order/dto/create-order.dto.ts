import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CreateOrderDetailDto } from '../order_detail/dto/create-order_detail.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {
    message: 'Tên phải có ít nhất 3 và tối đa 20 ký tự!',
  })
  recipient_name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(0[1-9][0-9]{8,9})$/, {
    message: 'Vui lòng nhập đúng định dạng số điện thoại',
  })
  recipient_phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 300, {
    message: 'Địa chỉ phải có ít nhất 5 và tối đa 300 ký tự!',
  })
  shipping_address: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsArray({ message: 'Danh sách sản phẩm phải là một mảng' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  order_details: CreateOrderDetailDto[];
}
