import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Post()
  create(@Body() createMemoDto: CreateMemoDto) {
    const { content, postId } = createMemoDto;
    return this.memoService.createMemo(content, postId);
  }

  @Get()
  findMemosByPost(@Param('postId') postId: number) {
    const memos = this.memoService.findMemosByPostId(postId);
  }

  @Patch()
  update(@Param('id') id: number, @Body() updateMemoDto: UpdateMemoDto) {
    const { content, postId } = updateMemoDto;
    return this.memoService.updateMemo(id, content, postId);
  }

  @Delete()
  remove(@Param('id') id: number) {
    return this.memoService.removeMemo(id);
  }
}
