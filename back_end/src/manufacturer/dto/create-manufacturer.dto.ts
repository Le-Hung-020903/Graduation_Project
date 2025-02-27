import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
export class CreateManufacturerDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 20, {
    message: 'Tên phải có ít nhất 4 và tối đa 20 ký tự!',
  })
  name: string;

  @IsNotEmpty()
  @Matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'Email không hợp lệ!',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 50, {
    message: 'Tên phải có ít nhất 4 và tối đa 50 ký tự!',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(0[1-9][0-9]{8,9})$/, {
    message: 'Vui lòng nhập đúng định dạng số điện thoại',
  })
  phone: string;
}
