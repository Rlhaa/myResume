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

@Entity('post')
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Memo, (memo) => memo.post, { cascade: true })
  memos: Memo[];
}
