// src/project/project.service.ts

import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async createProject(
    title: string,
    skill: string[],
    link?: string,
    description?: string,
    startDate?: string,
    endDate?: string,
  ) {
    const createdProject = await this.projectsRepository.saveProject(
      title,
      skill,
      link,
      description,
      startDate,
      endDate,
    );
    return { message: '프로젝트 생성 완료', data: { createdProject } };
  }

  async findAllProjects() {
    const projects = await this.projectsRepository.findAllProjects();
    return { message: '전체 프로젝트 조회 완료', data: { projects } };
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
    const updatedProject = await this.projectsRepository.updateProject(
      id,
      title,
      skill,
      link,
      description,
      startDate,
      endDate,
    );
    return { message: '프로젝트 수정 완료', data: { updatedProject } };
  }

  async removeProject(id: number) {
    await this.projectsRepository.removeProject(id);
    return { message: '프로젝트 삭제 완료' };
  }
}
