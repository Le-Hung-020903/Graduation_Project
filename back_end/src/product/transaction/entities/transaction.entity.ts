import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id_transaction: number;

  @Column()
  id_sepay: number; // ID giao dịch trên SePay

  @Column()
  gateway: string; // Brand name của ngân hàng

  @Column({ type: 'timestamp' })
  transaction_date: Date; // Thời gian xảy ra giao dịch phía ngân hàng

  @Column({ nullable: true })
  account_number: string; // Số tài khoản ngân hàng

  @Column({ nullable: true })
  code: string; // Mã code thanh toán (sepay tự nhận diện dựa vào cấu hình tại Công ty -> Cấu hình chung)

  @Column({ type: 'text', nullable: true })
  transaction_content: string; // Nội dung chuyển khoản

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  amount_in: number;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  amount_out: number;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  accumulated: number; // Số dư tài khoản (lũy kế)

  @Column({ nullable: true })
  sub_account: string; // Tài khoản ngân hàng phụ (tài khoản định danh),

  @Column({ nullable: true })
  reference_number: string; // Mã tham chiếu

  @Column({ type: 'text', nullable: true })
  body: string; // Toàn bộ nội dung tin notify ngân hàng

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;
}
