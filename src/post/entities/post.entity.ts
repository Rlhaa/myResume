import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Memo } from 'src/memo/entities/memo.entity';

export enum PostCategory {
  TIL = 'til',
  WIL = 'wil',
  TROUBLE = 'trouble',
  INFO = 'info',
}

@Entity('')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: PostCategory,
  })
  category: PostCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Memo, (memo) => memo.post, { cascade: true })
  memos: Memo[];
}
