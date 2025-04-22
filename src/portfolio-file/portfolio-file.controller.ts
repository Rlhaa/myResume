import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PortfolioFileService } from './portfolio-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/aws/aws.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('PortfolioFile')
@Controller('portfolio-file')
export class PortfolioFileController {
  constructor(
    private readonly portfolioFileService: PortfolioFileService,
    private readonly awsService: AwsService,
  ) {}

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Post('upload/:projectId')
  @ApiOperation({ summary: '포트폴리오 파일 업로드 및 프로젝트 연결' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '포트폴리오 파일 업로드 및 연결 성공',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPortfolioFile(
    @Param('projectId', ParseIntPipe) projectId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileUrl = await this.awsService.uploadFile(file);
    const createdPortfolioFile =
      await this.portfolioFileService.uploadAndConnect(fileUrl, projectId);
    return {
      message: '포트폴리오 파일 업로드 및 연결 성공',
      data: { createdPortfolioFile },
    };
  }

  @Get('preview/:projectId')
  @ApiOperation({
    summary: '프로젝트에 연결된 포트폴리오 파일 조회 (미리보기)',
  })
  @ApiResponse({ status: 200, description: '포트폴리오 파일 URL 조회 성공' })
  async previewPortfolioFile(
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    const fileUrl =
      await this.portfolioFileService.getPortfolioFileUrl(projectId);
    return { message: '포트폴리오 파일 조회 성공', data: { fileUrl } };
  }
}
