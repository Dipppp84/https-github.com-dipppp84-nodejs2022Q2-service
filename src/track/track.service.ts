import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { TrackDto } from './dto/track.dto';
import { FavoriteService } from '../favorite/favorite.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkId } from '../utils/validate';
import { sendNotFound } from '../utils/handler-error';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class TrackService {
  constructor(@Inject(forwardRef(() => FavoriteService))
              private favoriteService: FavoriteService,
              @Inject(forwardRef(() => ArtistService))
              private artistService: ArtistService,
              @Inject(forwardRef(() => AlbumService))
              private albumService: AlbumService,
              @InjectRepository(Track)
              private trackRepository: Repository<Track>) {
  }

  async getAll(): Promise<Track[]> {
    const all = await this.trackRepository.find({ loadRelationIds: true });
    return all.map(track => track);
  }

  async getById(id: string): Promise<Track> {
    checkId(id);
    const track = await this.trackRepository.findOne({
      where: { id: id },
      loadRelationIds: true,
    });
    if (!track)
      sendNotFound('Id doesn\'t exist');
    return track;
  }

  async create({ albumId, artistId, duration, name }: TrackDto): Promise<Track> {
    let album: Album = null;
    if (albumId)
      album = await this.albumService.getById(albumId);

    let artist: Artist = null;
    if (artistId)
      artist = await this.artistService.getById(artistId);

    const track = new Track(name, duration, artist, album);
    return this.trackRepository.save(track);
  }

  async update(id: string, { albumId, artistId, duration, name }: TrackDto): Promise<Track> {
    checkId(id);
    const track = await this.trackRepository.findOneBy({ id });
    if (!track)
      sendNotFound('Id doesn\'t exist');

    let album: Album = null;
    if (albumId)
      album = await this.albumService.getById(albumId);

    let artist: Artist = null;
    if (artistId)
      artist = await this.artistService.getById(artistId);

    track.name = name;
    track.artist = artist;
    track.album = album;
    track.duration = duration;
    return this.trackRepository.save(track);
  }

  async remove(id: string): Promise<any> {
    checkId(id);
    const track = await this.trackRepository.findOneBy({ id });
    if (!track)
      sendNotFound('Id doesn\'t exist');
    return this.trackRepository.delete(id);
  }
}
