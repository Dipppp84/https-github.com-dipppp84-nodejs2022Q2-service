import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from '../track/track.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { ArtistModule } from '../artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavoriteModule),
    TypeOrmModule.forFeature([Album]),
  ]
  ,
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {
}
