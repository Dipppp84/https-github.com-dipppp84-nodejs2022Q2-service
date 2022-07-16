import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [TrackModule],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {
}
