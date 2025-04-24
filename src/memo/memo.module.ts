import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { Memo } from './entities/memo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemosRepository } from './memo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Memo])],
  controllers: [MemoController],
  providers: [MemoService, MemosRepository],
})
export class MemoModule {}
