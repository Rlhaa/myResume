import { Injectable } from '@nestjs/common';
import { MemosRepository } from './memo.repository';

@Injectable()
export class MemoService {
  constructor(private readonly memoRepository: MemosRepository) {}

  async createMemo(content: string, postId: number) {
    const createdMemo = this.memoRepository.saveMemo(content, postId);

    return { message: '메모 생성 완료', data: { createdMemo } };
  }

  async findMemosByPostId(postId: number) {
    const memos = this.memoRepository.findMemosByPostId(postId);
    return { message: '포스트 별 메모 조회 완료', data: { memos } };
  }

  async updateMemo(id: number, content: string) {
    const updatedMemo = this.memoRepository.updateMemo(id, content);
    return { message: '메모 업데이트 완료', data: { updatedMemo } };
  }

  async removeMemo(id: number) {
    await this.memoRepository.removeMemo(id);
    return { message: '메모 삭제 완료' };
  }
}
