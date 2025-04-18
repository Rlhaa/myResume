// src/project/project.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: '프로젝트 생성' })
  create(@Body() createProjectDto: CreateProjectDto) {
    const { title, skill, link, description, startDate, endDate } =
      createProjectDto;
    return this.projectService.createProject(
      title,
      skill,
      link,
      description,
      startDate,
      endDate,
    );
  }

  @Get()
  @ApiOperation({ summary: '전체 프로젝트 조회' })
  findAll() {
    return this.projectService.findAllProjects();
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: '프로젝트 수정' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const { title, skill, link, description, startDate, endDate } =
      updateProjectDto;
    return this.projectService.updateProject(
      id,
      title,
      skill,
      link,
      description,
      startDate,
      endDate,
    );
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: '프로젝트 삭제' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.removeProject(id);
  }
}
