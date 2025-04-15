import { IsNotEmpty, Matches } from 'class-validator';
export class CheckOrderStatusDto {
  @IsNotEmpty()
  @Matches(/^DH\d+$/, {
    message: 'Mã đơn hàng không hợp lệ. Phải có định dạng DH + số ID',
  })
  order_code: string;
}
