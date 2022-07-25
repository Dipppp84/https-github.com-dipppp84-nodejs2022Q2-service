import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions, } from '@nestjs/typeorm';
import 'dotenv/config';

export const configAsync: TypeOrmModuleAsyncOptions = {
  useFactory:async ():Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number.parseInt(process.env.PORT_DB,4),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      retryAttempts: 3,
      migrations: ['dist/migration/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: false,
    }
  }
}