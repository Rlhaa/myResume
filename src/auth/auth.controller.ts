import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '관리자 로그인' })
@ApiBody({ type: LoginDto })
@ApiResponse({ status: 201, description: '로그인 성공 (JWT 토큰 반환)' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { id, password } = loginDto;
    const token = await this.authService.validateUserAndLogin(id, password);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { accessToken: token };
  }
}
