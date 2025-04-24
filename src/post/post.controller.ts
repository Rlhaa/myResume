import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: '포스트 생성' })
  @ApiResponse({ status: 201, description: '포스트 생성 성공' })
  createPost(@Body() createPostDto: CreatePostDto) {
    const { title, category, content } = createPostDto;
    return this.postService.createPost(title, category, content);
  }

  @Get()
  @ApiOperation({ summary: '포스트 전체 조회' })
  @ApiResponse({ status: 200, description: '포스트  전체 조회 성공' })
  findAll() {
    return this.postService.findAllPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: '포스트 상세 조회' })
  @ApiResponse({ status: 200, description: '포스트 상세 조회 성공' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOnePost(id);
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: '포스트 업데이트' })
  @ApiResponse({ status: 200, description: '포스트 업데이트 성공' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const { title, category, content } = updatePostDto;
    return this.postService.updatePost(id, title, category, content);
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: '포스트 삭제' })
  @ApiResponse({ status: 200, description: '포스트 삭제 성공' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.removePost(id);
  }
}
