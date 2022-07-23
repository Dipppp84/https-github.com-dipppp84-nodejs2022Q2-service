import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number.parseInt(process.env.PORT_DB,4),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  autoLoadEntities: true,//entities: [User], //['dist/**/entities/*.entity.js']
  retryAttempts: 3,

  synchronize: true,
  // migrations: ['src/migration/*MyMigration.ts'],
  // migrationsRun: true,
}