import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { Track } from './track/entities/track.entity';
import { Favorite } from './favorite/entities/favorite.entity';
import 'dotenv/config';

const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number.parseInt(process.env.PORT_DB, 4),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Artist, Album, Track, Favorite],
  migrations: ['dist/migration/*{.ts,.js}'],
  logging: true,
  synchronize: false,
});
export default myDataSource;