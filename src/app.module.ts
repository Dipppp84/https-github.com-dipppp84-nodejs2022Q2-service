import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoriteModule } from './favorite/favorite.module';
import { config } from './config.orm'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, ArtistModule, TrackModule, AlbumModule, FavoriteModule, TypeOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule {}
