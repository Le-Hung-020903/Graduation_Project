import { IsIn, IsOptional, IsString } from 'class-validator';

export class createNotification {
  @IsString()
  order_code: string;

  @IsString()
  @IsIn(['PAID', 'UNPAID'], {
    message: 'Trạng thái thanh toán chỉ được là PAID hoặc UNPAID',
  })
  payment_status: string;

  @IsString()
  @IsIn(['COD', 'QR_PAYMENT'], {
    message: 'Phương thức thanh toán chỉ được là COD hoặc QR_PAYMENT',
  })
  payment_method: string;

  @IsOptional()
  admin_redirect_url?: string;

  @IsOptional()
  user_redirect_url?: string;

  @IsOptional()
  user_id?: number;
}
