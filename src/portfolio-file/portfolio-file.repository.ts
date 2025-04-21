import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioFile } from './entities/portfolio-file.entity';

@Injectable()
export class PortfolioFileRepository {
  constructor(
    @InjectRepository(PortfolioFile)
    private readonly portfolioFileRepository: Repository<PortfolioFile>,
  ) {}

  async savePortfolioFile(url: string) {
    const portfolioFile = this.portfolioFileRepository.create({ url });
    return await this.portfolioFileRepository.save(portfolioFile);
  }
}
