import { PortfolioFile } from 'src/portfolio-file/entities/portfolio-file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('simple-array', { nullable: true })
  skill: string[]; // ex) ['NestJS', 'MySQL']

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  endDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => PortfolioFile, (file) => file.project, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  portfolioFile: PortfolioFile;
}
