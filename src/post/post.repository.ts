import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, PostCategory } from './entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async savePost(
    title?: string,
    category?: PostCategory,
    content?: string,
    id?: number,
  ) {
    if (id !== undefined) {
      const post = await this.findOnePost(id);

      post.title = title ?? post.title;
      post.category = category ?? post.category;
      post.content = content ?? post.content;

      return this.postsRepository.save(post);
    } else {
      const newPost = this.postsRepository.create({ title, category, content });
      return this.postsRepository.save(newPost);
    }
  }

  async findAllPosts() {
    return this.postsRepository.find();
  }

  async findOnePost(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    if (!post) {
      throw new NotFoundException('존재하지 않는 글입니다.');
    }
    return post;
  }

  async removePost(id: number) {
    const post = await this.findOnePost(id);
    return this.postsRepository.remove(post);
  }
}
