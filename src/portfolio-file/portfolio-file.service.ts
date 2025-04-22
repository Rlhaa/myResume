import { Injectable } from '@nestjs/common';
import { PortfolioFileRepository } from './portfolio-file.repository';

@Injectable()
export class PortfolioFileService {
  constructor(
    private readonly portfolioFileRepository: PortfolioFileRepository,
  ) {}

  async createPortfolioFile(url: string) {
    const createdPortfolioFile =
      await this.portfolioFileRepository.savePortfolioFile(url);
    return createdPortfolioFile;
  }

  async uploadAndConnect(fileUrl: string, projectId: number) {
    return this.portfolioFileRepository.saveAndConnect(fileUrl, projectId);
  }

  async getPortfolioFileUrl(projectId: number) {
    return this.portfolioFileRepository.findPortfolioFileUrl(projectId);
  }
}
