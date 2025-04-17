import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}
  async save(id: number, title: string, category: string, content: string) {}

  async findAll() {
    const posts = this.postsRepository.find();
    return posts;
  }

  async findOne(id: number) {
    const post = this.postsRepository.findOne({
      where: { id },
    });
    return post;
  }

  async remove(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });

    await this.postsRepository.remove(post);
  }
}
