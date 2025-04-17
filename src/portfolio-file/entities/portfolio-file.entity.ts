import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';

@Entity('')
export class PortfolioFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @OneToOne(() => Project, (project) => project.portfolioFile, {
    onDelete: 'CASCADE',
  })
  project: Project;
}
