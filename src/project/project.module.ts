import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsRepository } from './project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectsRepository],
})
export class ProjectModule {}
