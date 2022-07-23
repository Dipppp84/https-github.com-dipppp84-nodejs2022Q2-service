import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { FavoriteDto } from './dto/favorite.dto';
import { Album } from '../album/entities/album.entity';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { sendNotFound, sendUnprocessableEntity } from '../utils/handler-error';
import { checkId } from '../utils/validate';

const favorite = new Favorite();

@Injectable()
export class FavoriteService {
  constructor(@Inject(forwardRef(() => TrackService))
              private trackService: TrackService,
              @Inject(forwardRef(() => AlbumService))
              private albumService: AlbumService,
              @Inject(forwardRef(() => ArtistService))
              private artistService: ArtistService) {
  }

  getAll(): FavoriteDto {
    /*return {
      albums: favorite.albums.map<Album>(id => this.albumService.getById(id)),
      artists: favorite.artists.map<Artist>(id => this.artistService.getById(id)),
      tracks: favorite.tracks.map<Track>(id => this.trackService.getById(id)),
    };*/
    return null
  }

  setTrack(id: string) {
    try {
      this.trackService.getById(id);
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND)
        sendUnprocessableEntity('trackId doesn\'t exist');
      else throw e;
    }
    favorite.tracks.push(id);
  }

  removeTrack(id: string) {
    this.isIdInFavorite(id, favorite.tracks);
    this.simpleRemoveTrack(id);
  }

  setArtist(id: string) {
    try {
      this.artistService.getById(id);
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND)
        sendUnprocessableEntity('artistId doesn\'t exist');
      else throw e;
    }
    favorite.artists.push(id);
  }

  removeArtist(id: string) {
    this.isIdInFavorite(id, favorite.artists);
    this.simpleRemoveArtist(id);
  }

  setAlbum(id: string) {
    try {
      this.albumService.getById(id);
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND)
        sendUnprocessableEntity('albumsId doesn\'t exist');
      else throw e;
    }
    favorite.albums.push(id);
  }

  removeAlbum(id: string) {
    this.isIdInFavorite(id, favorite.albums);
    this.simpleRemoveAlbum(id);
  }

  private isIdInFavorite(id: string, arr: string[]) {
    checkId(id);
    if (!arr.includes(id))
      sendNotFound('id is not favorite');
  }

  simpleRemoveArtist(id: string): void {
    const number = favorite.artists.indexOf(id);
    if (number != -1)
      favorite.artists.splice(number, 1);
  }

  simpleRemoveAlbum(id: string): void {
    const number = favorite.albums.indexOf(id);
    if (number != -1)
      favorite.albums.splice(number, 1);
  }

  simpleRemoveTrack(id: string): void {
    const number = favorite.tracks.indexOf(id);
    if (number != -1)
      favorite.tracks.splice(number, 1);
  }
}
