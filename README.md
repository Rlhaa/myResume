<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">웹 기반 이력서 및 포트폴리오 관리 백엔드 API</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

## 📝 프로젝트 소개

**myResume**는 개인 이력서 및 포트폴리오를 관리하기 위한 웹 기반 백엔드 API입니다.  
작성된 포스트(TIL/WIL), 프로젝트, 포트폴리오 파일을 통합적으로 관리할 수 있으며,  
**관리자만 접근 가능한 인증 시스템**과 **AWS S3 기반 포트폴리오 업로드 기능**을 제공합니다.

---

## 🚀 주요 기능

| 기능 | 설명 |
|------|------|
| 🔐 관리자 인증 | JWT 기반 인증 시스템 구현 (`/auth/login`) |
| 📝 글 관리 | 포스트(TIL/WIL 등) 작성/수정/삭제/조회 API |
| 📌 메모 기능 | 글 하단에 나만 볼 수 있는 메모(댓글) 기능 |
| 📂 프로젝트 관리 | 기술 스택, 링크, 설명 등을 포함한 프로젝트 카드 관리 |
| 🖼️ 포트폴리오 업로드 | AWS S3를 통한 포트폴리오 파일 업로드 및 프로젝트 연동 |
| 📄 Swagger 문서화 | `/api` 경로에서 API 테스트 및 문서 확인 가능 |

---

## ⚙️ 기술 스택

- **Framework**: NestJS (TypeScript)
- **Database**: MySQL (AWS RDS)
- **ORM**: TypeORM
- **Authentication**: Passport + JWT
- **File Upload**: AWS S3 (`@aws-sdk/client-s3`)
- **API Docs**: Swagger (`@nestjs/swagger`)
- **Validation**: class-validator / DTO 기반 유효성 검사

---

## 🧱 폴더 구조

```
myResume
├─ .prettierrc
├─ eslint.config.mjs
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.module.ts
│  ├─ auth
│  │  ├─ auth.controller.ts
│  │  ├─ auth.module.ts
│  │  ├─ auth.service.ts
│  │  ├─ dto
│  │  │  └─ login.dto.ts
│  │  └─ jwt.strategy.ts
│  ├─ aws
│  │  ├─ aws.module.ts
│  │  └─ aws.service.ts
│  ├─ main.ts
│  ├─ memo
│  │  ├─ dto
│  │  │  ├─ create-memo.dto.ts
│  │  │  └─ update-memo.dto.ts
│  │  ├─ entities
│  │  │  └─ memo.entity.ts
│  │  ├─ memo.controller.ts
│  │  ├─ memo.module.ts
│  │  ├─ memo.repository.ts
│  │  └─ memo.service.ts
│  ├─ portfolio-file
│  │  ├─ entities
│  │  │  └─ portfolio-file.entity.ts
│  │  ├─ portfolio-file.controller.ts
│  │  ├─ portfolio-file.module.ts
│  │  ├─ portfolio-file.repository.ts
│  │  └─ portfolio-file.service.ts
│  ├─ post
│  │  ├─ dto
│  │  │  ├─ create-post.dto.ts
│  │  │  └─ update-post.dto.ts
│  │  ├─ entities
│  │  │  └─ post.entity.ts
│  │  ├─ post.controller.ts
│  │  ├─ post.module.ts
│  │  ├─ post.repository.ts
│  │  └─ post.service.ts
│  └─ project
│     ├─ dto
│     │  ├─ create-project.dto.ts
│     │  └─ update-project.dto.ts
│     ├─ entities
│     │  └─ project.entity.ts
│     ├─ project.controller.ts
│     ├─ project.module.ts
│     ├─ project.repository.ts
│     └─ project.service.ts
├─ test
│  ├─ app.e2e-spec.ts
│  ├─ auth.e2e-spec.ts
│  ├─ jest-e2e.json
│  ├─ memo.e2e-spec.ts
│  ├─ post.e2e-spec.ts
│  └─ project.e2e-spec.ts
├─ tsconfig.build.json
└─ tsconfig.json

```

---

## 🧪 실행 방법

### 1. 환경변수 설정

루트에 `.env` 파일 생성:

```
# DB
DB_HOST=...
DB_PORT=3306
DB_USERNAME=...
DB_PASSWORD=...
DB_DATABASE=...

# AUTH
ADMIN_ID=admin
ADMIN_PW=yourpassword
JWT_SECRET=yourjwtsecret
JWT_EXPIRES_IN=1d

# AWS S3
AWS_REGION=ap-northeast-2
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET_NAME=myresume-portfolio-files
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 서버 실행

```bash
npm run start:dev
```

### 4. Swagger 접속

```
http://localhost:3000/api
```

---

## 📁 API 예시

- **로그인**  
  `POST /auth/login`  
  Request: `{ "id": "admin", "password": "..." }`  
  Response: `{ accessToken: "..." }`

- **포트폴리오 업로드**  
  `POST /portfolio-file/upload/:projectId`  
  Form-data: `file` (파일 첨부)  
  인증 필요 (`Bearer 토큰`)

---

## 🧑‍💻 개발자 Note

- 실제 포트폴리오 파일은 S3에 저장되고, 프로젝트와 1:1로 연결됩니다.
- 모든 **작성/수정/삭제**는 관리자 인증 후에만 가능하도록 설정되어 있습니다.
- Swagger를 통해 인증 포함 전체 API 테스트가 가능합니다.

---

## 📬 문의

- GitHub: [Rlhaa](https://github.com/Rlhaa)
- Email: sfzeho1001@gmail.com

---

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).