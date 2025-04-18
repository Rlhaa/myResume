import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Memo } from './entities/memo.entity';

@Injectable()
export class MemosRepository {
  constructor(
    @InjectRepository(Memo)
    private readonly memosRepository: Repository<Memo>,
  ) {}

  async saveMemo(content: string, postId: number) {
    const memo = this.memosRepository.create({ content, post: { id: postId } });
    return this.memosRepository.save(memo);
  }

  async updateMemo(id: number, content: string) {
    const memo = await this.memosRepository.findOne({ where: { id } });
    if (!memo) {
      throw new Error('해당 메모를 찾을 수 없습니다.');
    }
    memo.content = content;
    return this.memosRepository.save(memo);
  }

  async findMemosByPostId(postId: number) {
    return this.memosRepository.find({
      where: { post: { id: postId } },
      order: { createdAt: 'DESC' },
    });
  }

  async removeMemo(id: number) {
    const memo = await this.memosRepository.findOne({ where: { id } });
    if (!memo) {
      throw new Error('해당 메모를 찾을 수 없습니다.');
    }
    return this.memosRepository.remove(memo);
  }
}
