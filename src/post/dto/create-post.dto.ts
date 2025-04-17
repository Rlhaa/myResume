import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostCategory } from '../entities/post.entity';

export class CreatePostDto {
  @ApiProperty({
    description: '글 제목',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '카테고리',
    maxLength: 200,
  })
  @IsNotEmpty()
  @IsEnum(PostCategory)
  category: PostCategory;

  @ApiProperty({
    description: '내용',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
