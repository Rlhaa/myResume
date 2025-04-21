import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PortfolioFileService } from './portfolio-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/aws/aws.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('PortfolioFile')
@Controller('portfolio-file')
export class PortfolioFileController {
  constructor(
    private readonly portfolioFileService: PortfolioFileService,
    private readonly awsService: AwsService,
  ) {}

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Post('upload')
  @ApiOperation({ summary: '포트폴리오 파일 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: '포트폴리오 파일 업로드 성공' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPortfolioFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.awsService.uploadFile(file);
    const createdPortfolioFile = await this.portfolioFileService.createPortfolioFile(fileUrl);
    return { message: '포트폴리오 파일 업로드 성공', data: { createdPortfolioFile } };
  }
}
