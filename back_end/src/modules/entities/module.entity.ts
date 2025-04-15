import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Action } from '../action/entities/action.entity';
@Entity({ name: 'modules' })
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  desc: string;

  @ManyToMany(() => Action, (action) => action.modules, {
    cascade: true, // Khi xóa module, các liên kết trong bảng module_action cũng bị xóa
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'module_action', // Tên bảng trung gian
    joinColumn: {
      name: 'module_id', // Đổi tên cột từ moduleId → module_id
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'action_id', // Đổi tên cột từ actionId → action_id
      referencedColumnName: 'id',
    },
  })
  actions: Action[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;
}
