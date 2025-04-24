import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Injectable()
export class AwsService {
  private s3: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    this.bucketName =
      this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('업로드할 파일이 없습니다.');
    }

    const fileExtension = extname(file.originalname);
    const key = `${uuidv4()}${fileExtension}`;

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      await this.s3.send(command);
    } catch (error) {
      throw new InternalServerErrorException('파일 업로드에 실패했습니다.');
    }

    return `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${key}`;
  }
}
