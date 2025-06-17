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
  address_id?: number;
}
