import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'comment_posts' })
export class CommentPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => CommentPost, (commentPost) => commentPost.replies, {
    nullable: true,
    onDelete: 'CASCADE', // Khi xoá comment cha, tất cả comment con cũng bị xoá
  })
  @JoinColumn({ name: 'parent_id' })
  parent: CommentPost;

  @OneToMany(() => CommentPost, (commentPost) => commentPost.parent, {
    cascade: true, // Đảm bảo rằng các comment con cũng bị xoá theo cha
  })
  replies: CommentPost[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_at: Date;
}
