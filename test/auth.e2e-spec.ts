import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // 준비 코드
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
  });

  afterAll(async () => {
    // 정리 코드
    await app.close();
  });

  it('로그인 성공', async () => {
    // 테스트할 코드
    const response = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ id: 'dbeodnjs1001', password: 'qwe123' })
    .expect(201)
    .expect((res) => {
        expect(res.body.accessToken).toBeDefined();
      });
    
  });
});
