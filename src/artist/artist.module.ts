import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { AlbumModule } from '../album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

@Module({
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavoriteModule),
    TypeOrmModule.forFeature([Artist]),
  ],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {
}
