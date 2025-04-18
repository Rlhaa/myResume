import { Injectable } from '@nestjs/common';
import { PostsRepository } from './post.repository';
import { PostCategory } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async createPost(title: string, category: PostCategory, content: string) {
    const createdPost = await this.postsRepository.savePost(
      title,
      category,
      content,
    );
    // 개인 이력서 페이지라 딱히 검증할게 없네;;
    return { message: '포스트 생성 완료', data: { createdPost } };
  }

  async findAllPosts() {
    const posts = await this.postsRepository.findAllPosts();
    return { message: '전체 포스트 조회 완료', data: { posts } };
  }

  async findOnePost(id: number) {
    const posts = await this.postsRepository.findOnePost(id);
    return { message: '포스트 상세 조회 완료', data: posts };
  }

  async updatePost(
    id: number,
    title?: string,
    category?: PostCategory,
    content?: string,
  ) {
    const updatedPost = await this.postsRepository.savePost(
      title,
      category,
      content,
      id,
    );

    return { message: '포스트 업데이트 완료', data: { updatedPost } };
  }

  async removePost(id: number) {
    await this.postsRepository.removePost(id);
    return { message: '포스트 삭제 완료' };
  }
}
