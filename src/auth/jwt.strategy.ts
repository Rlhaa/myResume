import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 토큰 추출
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // 토큰 검증 시 사용할 키
    });
  }

  // 검증이 끝난 후 payload를 그대로 요청 객체에 담아 전달
  async validate(payload: any) {
    return { id: payload.id, role: payload.role };
  }
}
