import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PortfolioFileService } from './portfolio-file.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('portfolio-file')
export class PortfolioFileController {
  constructor(private readonly portfolioFileService: PortfolioFileService) {}

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Post()
  @UseInterceptors(FileInterceptor('file')) // 파일 업로드용
  @ApiOperation({ summary: '포트폴리오 파일 업로드' })
  @ApiConsumes('multipart/form-data') // ← 이게 있어야 file 업로드 가능!
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // binary 설정해야 파일 업로드 input이 생김
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: '포트폴리오 파일 업로드 성공' })
  uploadPortfolioFile(@UploadedFile() file: Express.Multer.File) {
    return this.portfolioFileService.uploadPortfolioFile(file);
  }
}
