import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostCategory } from '../entities/post.entity';

export class LoginDto {
  @ApiProperty({
    description: '글 제목',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '글 제목',
    maxLength: 200,
  })
  @IsNotEmpty()
  @IsEnum(PostCategory)
  category: PostCategory;

  @ApiProperty({
    description: '글 제목',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
