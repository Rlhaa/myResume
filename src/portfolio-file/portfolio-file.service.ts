// src/portfolio-file/portfolio-file.service.ts

import { Injectable } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service'; // AwsService import 되어있어야 해

@Injectable()
export class PortfolioFileService {
  constructor(private readonly awsService: AwsService) {}

  async uploadPortfolioFile(file: Express.Multer.File) {
    const url = await this.awsService.uploadFile(file);
    return { message: '포트폴리오 파일 업로드 완료', url };
  }
}
