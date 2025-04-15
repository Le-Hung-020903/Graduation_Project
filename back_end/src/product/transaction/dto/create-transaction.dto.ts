import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDecimal,
  Length,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  gateway: string; // Brand name của ngân hàng

  @IsNotEmpty()
  @IsDateString()
  transactionDate: string; // Thời gian giao dịch (ISO 8601 format)

  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  accountNumber: string; // Số tài khoản ngân hàng (có thể không bắt buộc)

  @IsOptional()
  @IsString()
  @MaxLength(100)
  code?: string; // Mã code thanh toán (có thể null)

  @IsNotEmpty()
  @IsString()
  content: string; // Nội dung chuyển khoản

  @IsNotEmpty()
  @IsEnum(['in', 'out'])
  transferType: 'in' | 'out'; // Loại giao dịch (tiền vào, tiền ra)

  @IsNotEmpty()
  transferAmount: number; // Số tiền giao dịch (2 chữ số thập phân)

  @IsOptional()
  accumulated?: number; // Số dư tài khoản (2 chữ số thập phân)

  @IsOptional()
  @IsString()
  @MaxLength(100)
  subAccount?: string; // Tài khoản ngân hàng phụ (nullable)

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  referenceCode: string; // Mã tham chiếu

  @IsOptional()
  @IsString()
  description?: string; // Mô tả giao dịch (nullable)
}
