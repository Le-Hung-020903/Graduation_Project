import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateStatusOrder {
  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  @IsEnum([
    'PENDING',
    'WAITING_CONFIRMATION',
    'SHIPPED',
    'DELIVERED',
    'CANCELED',
    'CONFIRMED',
  ])
  status?: string;

  @IsOptional()
  @IsInt({ message: 'Mã địa chỉ phải là số dương' })
  @Min(1, { message: 'Mã địa chỉ phải lớn hơn 0' })
  address_id?: number;
}
