import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gateway: string;

  @Column({ type: 'timestamp' })
  transaction_date: Date;

  @Column({ nullable: true })
  account_number: string;

  @Column({ nullable: true })
  sub_account: string;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  amount_in: number;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  amount_out: number;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  accumulated: number;

  @Column({ nullable: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  transaction_content: string;

  @Column({ nullable: true })
  reference_number: string;

  @Column({ type: 'text', nullable: true })
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;
}
