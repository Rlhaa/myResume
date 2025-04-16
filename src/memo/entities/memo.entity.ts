import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@Entity('memo')
export class Memo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Post, (post) => post.memos, {
    onDelete: 'CASCADE',
  })
  post: Post;

  //   @OneToMany(() => Memo, (memo) => memo.post, { cascade: true })
  //   memos: Memo[];
}
