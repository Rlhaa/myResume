import { Injectable } from '@nestjs/common';
import { MemosRepository } from './memo.repository';

@Injectable()
export class MemoService {
  constructor(private readonly memoRepository: MemosRepository) {}

  async createMemo(content: string, postId: Number) {
    const createdMemo = this.memoRepository.save();
  }

  async findMemosByPostId(content: string, postId: Number) {
    const memos = this.memoRepository.findMemosByPostId();
  }

  async updateMemo(content: string, postId: Number) {
    const createdMemo = this.memoRepository.save();
  }

  async removeMemo(id: Number) {
    const createdMemo = this.memoRepository.removeMemo(id);
  }
}
