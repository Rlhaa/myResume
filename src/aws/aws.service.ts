// src/aws/aws.service.ts
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import * as multerS3 from 'multer-s3';
import * as multer from 'multer';

@Injectable()
export class AwsService {
  private s3: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.getOrThrow<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.bucketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File) {
    const fileExtension = extname(file.originalname);
    const key = `${uuidv4()}${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    return `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${key}`;
  }

  public multerUploader() {
    return multer({
      storage: multerS3({
        s3: this.s3,
        bucket: this.bucketName,
        acl: 'public-read',
        key: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    });
  }
}
