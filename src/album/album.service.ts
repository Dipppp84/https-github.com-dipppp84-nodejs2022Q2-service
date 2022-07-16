import { Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { checkIdAndEntity } from '../utils/validate';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './entities/album.entity';
import { AlbumDto } from './dto/album.dto';

const albums = new Map<string, Album>;

@Injectable()
export class AlbumService {

  constructor(
    private trackService: TrackService) {
  }

  getAll(): Album[] {
    return Array.from(albums.values());
  }

  getById(id: string): Album {
    return checkIdAndEntity<Album>(id, albums);
  }

  create(createAlbum: AlbumDto): Album {
    const album: Album = {
      id: uuidv4(),
      name: createAlbum.name,
      year: createAlbum.year,
      artistId: createAlbum.artistId,
    };
    albums.set(album.id, album);
    return album;
  }

  update(id: string, updateAlbum: AlbumDto): Album {
    const album = checkIdAndEntity<Album>(id, albums);
    album.name = updateAlbum.name;
    album.year = updateAlbum.year;
    album.artistId = updateAlbum.artistId;
    return album;
  }

  remove(id: string) {
     const tracks = this.trackService.getAll();
     const track = tracks.find(value => value.albumId === id);
     if (track) {
       track.artistId = null;
       track.albumId = null;
     }

    checkIdAndEntity<Album>(id, albums);
    albums.delete(id);
  }
}
