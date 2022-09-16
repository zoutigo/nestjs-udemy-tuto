import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleCreateDto } from './dtos/role-create.dto';
import { RoleUpdateDto } from './dtos/role-update.dto';
import { Role } from './entity/role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async all() {
    return this.roleService.all();
  }

  @Post()
  async create(@Body() body: RoleCreateDto): Promise<Role> {
    const { permissions, ...rest } = body;
    return this.roleService.create({
      ...rest,
      permissions: permissions.map((id) => ({ id })),
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.roleService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: RoleUpdateDto) {
    const { permissions, ...rest } = body;
    await this.roleService.update(id, {
      ...rest,
    });

    const role = await this.roleService.findOne({ id });

    return this.roleService.create({
      ...role,
      permissions: permissions.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.roleService.delete(id);
  }
}
