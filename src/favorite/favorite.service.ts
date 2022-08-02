import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { Album } from '../album/entities/album.entity';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { sendNotFound, sendUnprocessableEntity } from '../utils/handler-error';
import { checkId } from '../utils/validate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  private static singleFavoriteId: Promise<string> = null;

  constructor(@Inject(forwardRef(() => TrackService))
              private trackService: TrackService,
              @Inject(forwardRef(() => AlbumService))
              private albumService: AlbumService,
              @Inject(forwardRef(() => ArtistService))
              private artistService: ArtistService,
              @InjectRepository(Favorite)
              private favoriteRepository: Repository<Favorite>) {
    if (!FavoriteService.singleFavoriteId)
      FavoriteService.singleFavoriteId = this.setSingleFavorite();
  }

  async setSingleFavorite(): Promise<string> {
    const favorites = await this.favoriteRepository.find({
      relations: {
        artists: true,
        tracks: true,
        albums: true,
      },
    });
    if (favorites.length === 0) {
      const favorite = { tracks: [], artists: [], albums: [] };
      const saveFavorite = await this.favoriteRepository.save(favorite);
      return saveFavorite.id;
    } else {
      return favorites[0].id;
    }
  }

  async getSingleFavorite(): Promise<Favorite> {
    const id = await FavoriteService.singleFavoriteId;
    return this.favoriteRepository.findOne({
      where: { id: id },
      relations: {
        artists: true,
        tracks: true,
        albums: true,
      },
    });
  }

  async getAll(): Promise<Favorite> {
    const favorite = await this.getSingleFavorite();
    const albumsPromise = Promise.all(favorite.albums.map(album => this.albumService.getById(album.id)));
    const artistsPromise = Promise.all(favorite.artists.map(artist => this.artistService.getById(artist.id)));
    const tracksPromise = Promise.all(favorite.tracks.map(track => this.trackService.getById(track.id)));

    favorite.albums = await albumsPromise;
    favorite.artists = await artistsPromise;
    favorite.tracks = await tracksPromise;
    return favorite
  }

  async setTrack(id: string): Promise<void> {
    let track: Track;
    try {
      track = await this.trackService.getById(id);
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND)
        sendUnprocessableEntity('trackId doesn\'t exist');
      else throw e;
    }

    const favorite = await this.getSingleFavorite();
    favorite.tracks.push(track);
    await this.favoriteRepository.save(favorite);
  }

  async removeTrack(id: string): Promise<void> {
    const favorite = await this.getSingleFavorite();
    this.isIdInFavorite(id, favorite.tracks);

    favorite.tracks = favorite.tracks.filter((track) => {
      return track.id !== id;
    });
    await this.favoriteRepository.save(favorite);
  }

  async setArtist(id: string): Promise<void> {
    let artist: Artist;
    try {
      artist = await this.artistService.getById(id);
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND)
        sendUnprocessableEntity('artistId doesn\'t exist');
      else throw e;
    }

    const favorite = await this.getSingleFavorite();
    favorite.artists.push(artist);
    await this.favoriteRepository.save(favorite);
  }

  async removeArtist(id: string): Promise<void> {
    const favorite = await this.getSingleFavorite();
    this.isIdInFavorite(id, favorite.artists);

    favorite.artists = favorite.artists.filter((artist) => {
      return artist.id !== id;
    });
    await this.favoriteRepository.save(favorite);
  }

  async setAlbum(id: string): Promise<void> {
    let album: Album;
    try {
      album = await this.albumService.getById(id);
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND)
        sendUnprocessableEntity('albumId doesn\'t exist');
      else throw e;
    }

    const favorite = await this.getSingleFavorite();
    favorite.albums.push(album);
    await this.favoriteRepository.save(favorite);
  }

  async removeAlbum(id: string): Promise<void> {
    const favorite = await this.getSingleFavorite();
    this.isIdInFavorite(id, favorite.albums);
    favorite.albums = favorite.albums.filter((album) => {
      return album.id !== id;
    });
    await this.favoriteRepository.save(favorite);
  }

  private isIdInFavorite<T extends Artist | Album | Track>(id: string, arr: T[]): void {
    checkId(id);
    const innerObj: T = arr.find(obj => obj.id === id);
    if (!innerObj)
      sendNotFound('id is not favorite');
  }
}
