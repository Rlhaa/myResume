import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { PortfolioFileModule } from './portfolio-file/portfolio-file.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoModule } from './memo/memo.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env 전역 사용 설정

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: config.get<boolean>('DB_SINC'), // 개발 중에만 true로, 배포 시에는 false 권장
        charset: 'utf8mb4',
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    ProjectModule,
    PortfolioFileModule,
    PostModule,
    AuthModule,
    MemoModule,
  ],
})
export class AppModule {}
