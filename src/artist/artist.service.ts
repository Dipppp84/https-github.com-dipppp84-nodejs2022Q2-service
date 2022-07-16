import { Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { checkIdAndEntity } from '../utils/validate';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ArtistService {
  private artistes = new Map<string, Artist>;

  getAll(): Artist[] {
    return Array.from(this.artistes.values());
  }

  getById(id: string): Artist {
    return checkIdAndEntity<Artist>(id, this.artistes);
  }

  create(createArtist: ArtistDto): Artist {
    const artist: Artist = {
      id: uuidv4(),
      name: createArtist.name,
      grammy: createArtist.grammy,
    };
    this.artistes.set(artist.id, artist);
    return artist;
  }

  update(id: string, updateArtist: ArtistDto): Artist {
    const artist = checkIdAndEntity<Artist>(id, this.artistes);
    artist.name = updateArtist.name;
    artist.grammy = updateArtist.grammy;
    return artist;
  }

  remove(id: string) {
    //todo should set track.artistId and track.albumId to null after deletion
    checkIdAndEntity<Artist>(id, this.artistes);
    this.artistes.delete(id);
  }
}
