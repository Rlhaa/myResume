import { Injectable } from '@nestjs/common';
import { PostsRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(title: string, category: string, content: string) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, title: string, category: string, content: string) {
    
  }

  async remove(id: number) {}
}
