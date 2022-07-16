import { Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { checkIdAndEntity } from '../utils/validate';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from '../track/track.service';

const artistes = new Map<string, Artist>;

@Injectable()
export class ArtistService {

  constructor(
    private trackService: TrackService) {
  }

  getAll(): Artist[] {
    return Array.from(artistes.values());
  }

  getById(id: string): Artist {
    return checkIdAndEntity<Artist>(id, artistes);
  }

  create(createArtist: ArtistDto): Artist {
    const artist: Artist = {
      id: uuidv4(),
      name: createArtist.name,
      grammy: createArtist.grammy,
    };
    artistes.set(artist.id, artist);
    return artist;
  }

  update(id: string, updateArtist: ArtistDto): Artist {
    const artist = checkIdAndEntity<Artist>(id, artistes);
    artist.name = updateArtist.name;
    artist.grammy = updateArtist.grammy;
    return artist;
  }

  remove(id: string) {
    const tracks = this.trackService.getAll();
    const track = tracks.find(value => value.artistId === id);
    if (track) {
      track.artistId = null;
      track.albumId = null;
    }

    checkIdAndEntity<Artist>(id, artistes);
    artistes.delete(id);
  }
}
