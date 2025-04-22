import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioFile } from './entities/portfolio-file.entity';
import { PortfolioFileService } from './portfolio-file.service';
import { PortfolioFileController } from './portfolio-file.controller';
import { AwsModule } from 'src/aws/aws.module'; // 추가
import { PortfolioFileRepository } from './portfolio-file.repository';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioFile, Project]), AwsModule],
  controllers: [PortfolioFileController],
  providers: [PortfolioFileService, PortfolioFileRepository],
})
export class PortfolioFileModule {}
