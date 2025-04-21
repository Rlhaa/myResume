import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

let accessToken: string;
let createdPostId: number;

describe('Post E2E', () => {
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

  it('포스트 생성 성공', async () => {
    const createPostDto = {
      title: '테스트 제목',
      category: 'TIL', // 실제 enum 값 맞게
      content: '테스트 본문입니다.',
    };
  
    const response = await request(app.getHttpServer())
      .post('/post')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createPostDto)
      .expect(201);
  

      createdPostId = response.body.data.createdPost.id;

    expect(response.body.data.createdPost.title).toBe(createPostDto.title);
    expect(response.body.data.createdPost.category).toBe(createPostDto.category);
    expect(response.body.data.createdPost.content).toBe(createPostDto.content);
  });
  

  it('포스트 전체 조회 성공', async () => {
    const response = await request(app.getHttpServer())
      .get('/post')
      .expect(200);
  
    expect(Array.isArray(response.body.data.posts)).toBe(true);
  });

  it('포스트 상세 조회 성공', async () => {
    const response = await request(app.getHttpServer())
      .get(`/post/${createdPostId}`) // 생성 테스트 시 발생한 ID 전역변수에 저장해 사용
      .expect(200);
  
    expect(response.body.data.title).toBe('테스트 제목');
    expect(response.body.data.content).toBe('테스트 본문입니다.');
  });

  it('포스트 수정 성공', async () => {
    const updatePostDto = {
      title: '수정된 제목',
      category: 'WIL',
      content: '수정된 본문입니다.',
    };
  
    const response = await request(app.getHttpServer())
      .patch(`/post/${createdPostId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatePostDto)
      .expect(200);
  
    expect(response.body.data.updatedPost.title).toBe(updatePostDto.title);
    expect(response.body.data.updatedPost.content).toBe(updatePostDto.content);
  });

  it('포스트 삭제 성공', async () => {
    await request(app.getHttpServer())
      .delete(`/post/${createdPostId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

});
