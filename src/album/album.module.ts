import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from '../track/track.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [forwardRef(() =>ArtistModule),forwardRef(() =>TrackModule), forwardRef(() =>FavoriteModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {
}
