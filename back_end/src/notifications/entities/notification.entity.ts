import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: false, default: false })
  is_read: boolean;

  @Column({ nullable: true })
  user_redirec_url: string;

  @Column({ nullable: true })
  admin_redirec_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  receiver_role: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;

  // 🔗 Liên kết với user
  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: 'CASCADE', // Khi xoá user thì xoá toàn bộ thông báo của user đó
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
