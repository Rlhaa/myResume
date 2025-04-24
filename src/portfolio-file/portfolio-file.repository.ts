import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioFile } from './entities/portfolio-file.entity';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class PortfolioFileRepository {
  constructor(
    @InjectRepository(PortfolioFile)
    private readonly portfolioFileRepository: Repository<PortfolioFile>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async savePortfolioFile(url: string) {
    const portfolioFile = this.portfolioFileRepository.create({ url });
    return await this.portfolioFileRepository.save(portfolioFile);
  }

  async saveAndConnect(fileUrl: string, projectId: number) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['portfolioFile'],
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다.');
    }

    const portfolioFile = this.portfolioFileRepository.create({
      url: fileUrl,
      project,
    });

    return this.portfolioFileRepository.save(portfolioFile);
  }

  async findPortfolioFileUrl(projectId: number): Promise<string> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['portfolioFile'],
    });

    if (!project || !project.portfolioFile) {
      throw new NotFoundException('해당 프로젝트에 포트폴리오 파일이 없습니다.');
    }

    return project.portfolioFile.url;
  }
}
