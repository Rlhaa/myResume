import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { ProjectModule } from './project/project.module';
import { PortfolioFileModule } from './portfolio-file/portfolio-file.module';
import { PostModule } from './post/post.module';
import { ExperienceModule } from './experience/experience.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env 전역 사용 설정
    UserModule,
    SkillModule,
    ProjectModule,
    PortfolioFileModule,
    PostModule,
    ExperienceModule,
    ContactModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
