import { Module } from '@nestjs/common';
import { PortfolioFileController } from './portfolio-file.controller';
import { PortfolioFileService } from './portfolio-file.service';

@Module({
  controllers: [PortfolioFileController],
  providers: [PortfolioFileService]
})
export class PortfolioFileModule {}
