import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { checkIdAndEntityOld } from '../utils/validate';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './entities/track.entity';
import { TrackDto } from './dto/track.dto';
import { FavoriteService } from '../favorite/favorite.service';

const tracks = new Map<string, Track>;

@Injectable()
export class TrackService {
  constructor(@Inject(forwardRef(() => FavoriteService))
              private favoriteService: FavoriteService) {
  }
  getAll(): Track[] {
    return Array.from(tracks.values());
  }

  getById(id: string): Track {
    return checkIdAndEntityOld<Track>(id, tracks);
  }

  create(createTrack: TrackDto): Track {
    const track: Track = {
      id: uuidv4(),
      name: createTrack.name,
      artistId: createTrack.artistId,
      albumId: createTrack.albumId,
      duration: createTrack.duration,
    };
    tracks.set(track.id, track);
    return track;
  }

  update(id: string, updateTrack: TrackDto): Track {
    const track = checkIdAndEntityOld<Track>(id, tracks);

    track.name = updateTrack.name;
    track.artistId = updateTrack.artistId;
    track.albumId = updateTrack.albumId;
    track.duration = updateTrack.duration;
    return track;
  }

  remove(id: string) {
    this.favoriteService.simpleRemoveTrack(id);

    checkIdAndEntityOld<Track>(id, tracks);
    tracks.delete(id);
  }

  async simpleRemoveArtisAndAlbum(id: string){
    //todo delete ArtistID and AlbumID
  }

}
