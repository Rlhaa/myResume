import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

let accessToken: string;
let postId: number;
let createdMemoId: number;

describe('Post E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // 1. 로그인 먼저
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: process.env.ADMIN_ID,
        password: process.env.ADMIN_PW,
      });

    accessToken = loginResponse.body.accessToken; // 여기 accessToken 저장

    // 2. accessToken 세팅한 다음 포스트 생성
    const postCreateResponse = await request(app.getHttpServer())
      .post('/post')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: '메모용 테스트 포스트',
        category: 'TIL',
        content: '메모를 위한 포스트 본문',
      });

    postId = postCreateResponse.body.data.createdPost.id;
  });

  afterAll(async () => {
    await app.close();
  });

   it('메모 생성 성공', async () => {
      const createMemoDto = {
        postId,
        content: '테스트 본문입니다.',
      };
    
      const response = await request(app.getHttpServer())
        .post('/memo')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(createMemoDto)
        .expect(201);
    
  
        createdMemoId = response.body.data.createdMemo.id;
  
      expect(response.body.data.createdMemo.content).toBe(createMemoDto.content);
    });

    it('포스트별 메모 조회 성공', async () => {
            const response = await request(app.getHttpServer())
            .get(`/memo/${postId}`)

              .expect(200);
          
              expect(Array.isArray(response.body.data.memos)).toBe(true); // 배열인지 확인
              expect(response.body.data.memos[0].content).toBeDefined(); // 첫 번째 메모가 존재하는지 확인
    })

    it('메모 수정 성공', async () => {
        const updateMemoDto = {
          content: '수정된 본문입니다.',
        };
      
        const response = await request(app.getHttpServer())
          .patch(`/memo/${createdMemoId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(updateMemoDto)
          .expect(200);
      
        expect(response.body.data.updatedMemo.content).toBe(updateMemoDto.content);
      });

      it('메모 삭제 성공', async () => {
        await request(app.getHttpServer())
          .delete(`/memo/${createdMemoId}`) // 생성했던 메모 ID로 삭제
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);
      });
});
