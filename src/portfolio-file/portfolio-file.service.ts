import { Injectable } from '@nestjs/common';
import { PortfolioFileRepository } from './portfolio-file.repository';

@Injectable()
export class PortfolioFileService {
  constructor(private readonly portfolioFileRepository: PortfolioFileRepository) {}

  async createPortfolioFile(url: string) {
    const createdPortfolioFile = await this.portfolioFileRepository.savePortfolioFile(url);
    return createdPortfolioFile;
  }
}
