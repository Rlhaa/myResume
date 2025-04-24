// src/memo/dto/update-memo.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMemoDto {
  @ApiProperty({
    description: '메모 내용',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;
}
