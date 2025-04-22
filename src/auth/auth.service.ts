import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService, // .env 값을 주입받기 위한 서비스
    private readonly jwtService: JwtService, // JWT 토큰 생성을 위한 서비스
  ) {}

  async validateUserAndLogin(id: string, password: string) {
    // .env에서 관리자 계정 정보 불러오기
    const adminId = this.configService.get<string>('ADMIN_ID');
    const adminPw = this.configService.get<string>('ADMIN_PW');

    // 입력받은 ID/PW와 관리자 정보 비교
    const isValid = id === adminId && password === adminPw;

    // 불일치 시 예외 처리
    if (!isValid) {
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    // 일치 시 JWT payload 구성 (원하면 role 등 추가 가능)
    const payload = {
      id,
      role: 'admin',
    };

    // JWT 토큰 생성
    const token = this.jwtService.sign(payload);

    // accessToken 반환
    return token;
  }
}
