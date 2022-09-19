import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

console.log('docker:', process.env.DOCKER);

const dbPort =
  process.env.DOCKER === 'ENABLE'
    ? parseInt(process.env.DB_PORT_INT, 10) || 3306
    : parseInt(process.env.DB_PORT_EXT, 10) || 33306;

console.log('dbport:', dbPort);
console.log('dbHost:', process.env.DB_HOST);

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: dbPort,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,

      //   entities: [process.env.TYPEORM_ENTITIES],
      logging: true,
      synchronize: true,
      //   migrations: [process.env.TYPEORM_MIGRATIONS],
      //   cli: {
      //     migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      //   },
      //   namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
