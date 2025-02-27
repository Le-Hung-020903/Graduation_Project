import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'black_lists' })
export class BlackList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  token: string;

  @Column()
  expired: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;
}
