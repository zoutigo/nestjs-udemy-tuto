import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfiguration } from './config/orm/database.config';
import typeOrmAsyncConfig from './config/orm/typeOrmAsyncConfig';
import typeOrmConfig from './config/orm/typeOrmConfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(
      // typeOrmAsyncConfig,
      {
        useClass: DatabaseConfiguration,
      },
      // typeOrmConfig,
      //   {
      //   type: 'mysql',
      //   host: 'db',
      //   port: 3306,
      //   username: 'root',
      //   password: 'root',
      //   database: 'admin',
      //   // entities: [],
      //   autoLoadEntities: true,
      //   synchronize: true,
      // }
    ),
    UserModule,
    AuthModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
