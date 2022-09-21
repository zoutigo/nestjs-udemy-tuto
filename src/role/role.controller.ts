import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { RoleCreateDto } from './dtos/role-create.dto';
import { RoleUpdateDto } from './dtos/role-update.dto';
import { Role } from './entity/role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @HasPermission('roles')
  async all() {
    return this.roleService.all(['permissions']);
  }

  @Post()
  @HasPermission('roles')
  async create(@Body() body: RoleCreateDto): Promise<Role> {
    const { permissions, ...rest } = body;
    return this.roleService.create({
      ...rest,
      permissions: permissions.map((id) => ({ id })),
    });
  }

  @Get(':id')
  @HasPermission('roles')
  async get(@Param('id') id: number) {
    return this.roleService.findOne({ id }, ['permissions']);
  }

  @Put(':id')
  @HasPermission('roles')
  async update(@Param('id') id: number, @Body() body: RoleUpdateDto) {
    const { permissions, ...rest } = body;
    await this.roleService.update(id, {
      ...rest,
    });

    const role = await this.roleService.findOne(id);

    return this.roleService.create({
      ...role,
      permissions: permissions.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  @HasPermission('roles')
  async delete(@Param('id') id: number): Promise<any> {
    return this.roleService.delete(id);
  }
}
