import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: '프로젝트 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '사용한 기술 스택',
    example: ['NestJS', 'TypeScript'],
  })
  @IsArray()
  @IsNotEmpty()
  skill: string[];

  @ApiProperty({ description: '외부 링크', required: false })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiProperty({ description: '프로젝트 설명', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: '시작 날짜',
    required: false,
    example: '2024-01-01',
  })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: '종료 날짜',
    required: false,
    example: '2024-03-01',
  })
  @IsString()
  @IsOptional()
  endDate?: string;
}
