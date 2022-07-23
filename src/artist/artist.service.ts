import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { checkIdAndEntityOld } from '../utils/validate';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { FavoriteService } from '../favorite/favorite.service';
import { AlbumService } from '../album/album.service';

const artistes = new Map<string, Artist>;

@Injectable()
export class ArtistService {

  constructor(@Inject(forwardRef(() => TrackService))
              private trackService: TrackService,
              @Inject(forwardRef(() => FavoriteService))
              private favoriteService: FavoriteService,
              @Inject(forwardRef(() => AlbumService))
              private albumService: AlbumService) {
  }

  getAll(): Artist[] {
    return Array.from(artistes.values());
  }

  getById(id: string): Artist {
    return checkIdAndEntityOld<Artist>(id, artistes);
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
    const artist = checkIdAndEntityOld<Artist>(id, artistes);
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

    const albums = this.albumService.getAll();
    const album = albums.find(value => value.artistId === id);
    if (album) {
      album.artistId = null;
    }

    this.favoriteService.simpleRemoveArtist(id);

    checkIdAndEntityOld<Artist>(id, artistes);
    artistes.delete(id);
  }
}
