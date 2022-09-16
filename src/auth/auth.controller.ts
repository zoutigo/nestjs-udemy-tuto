import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.passwordConfirm) {
      throw new BadRequestException('Passwords does not match');
    }
    const hashed = await bcrypt.hash(body.password, 12);

    return this.userService.create({
      ...body,
      password: hashed,
      role: { id: 4 },
    });
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
    // @Res() response: Response,
  ) {
    const { email, password } = body;
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException(
        'Utilisateur inexistant dans notre base de donnée',
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Le mot de pass est incorrect');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    response.cookie('jwt', jwt, { httpOnly: true });
    return user;
  }

  // @UseInterceptors(AuthInterceptor)
  @UseGuards(AuthGuard)
  @Get('user')
  async user(@Req() request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    return this.userService.findOne({ id: data['id'] });
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'succesfull logout',
    };
  }
}
