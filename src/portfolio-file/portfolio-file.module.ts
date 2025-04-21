import { Module } from '@nestjs/common';
import { PortfolioFileController } from './portfolio-file.controller';
import { PortfolioFileService } from './portfolio-file.service';
import { PortfolioFile } from './entities/portfolio-file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioFile])],
  controllers: [PortfolioFileController],
  providers: [PortfolioFileService],
})
export class PortfolioFileModule {}
