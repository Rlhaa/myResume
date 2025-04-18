// src/project/project.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async saveProject(
    title: string,
    skill: string[],
    link?: string,
    description?: string,
    startDate?: string,
    endDate?: string,
  ) {
    const project = this.projectsRepository.create({
      title,
      skill,
      link,
      description,
      startDate,
      endDate,
    });
    return this.projectsRepository.save(project);
  }

  async findAllProjects() {
    return this.projectsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOneProject(id: number) {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new Error('해당 프로젝트를 찾을 수 없습니다.');
    }
    return project;
  }

  async updateProject(
    id: number,
    title?: string,
    skill?: string[],
    link?: string,
    description?: string,
    startDate?: string,
    endDate?: string,
  ) {
    const project = await this.findOneProject(id);

    project.title = title ?? project.title;
    project.skill = skill ?? project.skill;
    project.link = link ?? project.link;
    project.description = description ?? project.description;
    project.startDate = startDate ?? project.startDate;
    project.endDate = endDate ?? project.endDate;

    return this.projectsRepository.save(project);
  }

  async removeProject(id: number) {
    const project = await this.findOneProject(id);
    return this.projectsRepository.remove(project);
  }
}
