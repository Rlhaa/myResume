import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: '메모 생성' })
  create(@Body() createMemoDto: CreateMemoDto) {
    const { content, postId } = createMemoDto;
    return this.memoService.createMemo(content, postId);
  }

  @Get(':postId')
  @ApiOperation({ summary: '메모 조회' })
  findMemosByPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.memoService.findMemosByPostId(postId);
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: '메모 업데이트' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemoDto: UpdateMemoDto,
  ) {
    const { content } = updateMemoDto;
    return this.memoService.updateMemo(id, content);
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: '메모 삭제' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.memoService.removeMemo(id);
  }
}
