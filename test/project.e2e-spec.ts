import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

let accessToken: string;
let createdProjectId: number;

describe('Project E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: process.env.ADMIN_ID,
        password: process.env.ADMIN_PW,
      });

    accessToken = loginResponse.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('프로젝트 생성 성공', async () => {
    const createProjectDto = {
        title: '테스트 제목',
        skill: [
            "NestJS",
            "TypeScript"
          ],
          link: '링크 입력',
        description: '테스트 본문입니다.',
        startDate: "2024-01-01",
        endDate: "2024-03-01"
      };
    const response = await request(app.getHttpServer())
    .post('/project')
    .set('Authorization', `Bearer ${accessToken}`)
    .send(createProjectDto)
    .expect(201);

    createdProjectId = response.body.data.createdProject.id

    expect(response.body.data.createdProject.title).toBe(createProjectDto.title);
    expect(response.body.data.createdProject.skill).toEqual(createProjectDto.skill);
    expect(response.body.data.createdProject.link).toBe(createProjectDto.link);
  });

  it('프로젝트 전체 조회 성공', async () => {
    const response = await request(app.getHttpServer())
      .get('/project')
      .expect(200);
  
    expect(Array.isArray(response.body.data.projects)).toBe(true); // projects가 배열인지 확인
  });
  


  it('프로젝트 수정 성공', async () => {
    const updateProjectDto = {
      title: '수정된 제목',
      skill: ['React', 'Node.js'],
      link: '수정된 링크',
      description: '수정된 설명',
      startDate: '2024-02-01',
      endDate: '2024-04-01',
    };
  
    const response = await request(app.getHttpServer())
      .patch(`/project/${createdProjectId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateProjectDto)
      .expect(200);
  
    expect(response.body.data.updatedProject.title).toBe(updateProjectDto.title);
    expect(response.body.data.updatedProject.skill).toEqual(updateProjectDto.skill);
    expect(response.body.data.updatedProject.link).toBe(updateProjectDto.link);
  });
  

  it('프로젝트 삭제 성공', async () => {
    await request(app.getHttpServer())
      .delete(`/project/${createdProjectId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
  

});
