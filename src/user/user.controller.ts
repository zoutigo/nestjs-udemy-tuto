import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dtos/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './dtos/user-update.dto';
import { PaginatedResultInterface } from 'src/common/interface/paginate-result.interface';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  // @Get()
  // async all() {
  //   return this.userService.all();
  // }
  @Get()
  async all(@Query('page') page = 1): Promise<PaginatedResultInterface> {
    return this.userService.paginate(page, ['role']);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const hashedPassword = await bcrypt.hash('1234', 12);
    const { roleId, ...rest } = body;

    return this.userService.create({
      ...rest,
      role: { id: roleId },
      password: hashedPassword,
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne({ id }, ['role']);
  }

  @Put('info')
  async updateInfo(@Body() body: UserUpdateDto, @Req() request: Request) {
    const id = await this.authService.userId(request);
    await this.userService.update(id, body);
    return this.userService.findOne({ id });
  }

  @Put('password')
  async updatePassword(
    @Body('password') password: string,
    @Body('passwordConfirm') passwordConfirm: string,
    @Req() request: Request,
  ) {
    if (password !== passwordConfirm) {
      throw new BadRequestException('les mots de pass doivent etre identiques');
    }
    const id = await this.authService.userId(request);
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.userService.update(id, { password: hashedPassword });
    return this.userService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    const { roleId, ...rest } = body;
    await this.userService.update(id, { ...rest, role: { id: roleId } });
    return this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.userService.delete(id);
  }
}
