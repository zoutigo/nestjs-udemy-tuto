import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { RoleModule } from 'src/role/role.module';
import { Permission } from './entity/permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), CommonModule, RoleModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
