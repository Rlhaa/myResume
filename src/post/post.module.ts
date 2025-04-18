import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsRepository } from './post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, PostsRepository],
})
export class PostModule {}
