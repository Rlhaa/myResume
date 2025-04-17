// src/memo/dto/create-memo.dto.ts

import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemoDto {
  @ApiProperty({
    description: '메모 내용',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: '메모가 달릴 글(Post) ID',
  })
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
