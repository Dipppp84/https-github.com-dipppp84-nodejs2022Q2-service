import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { TrackDto } from './dto/track.dto';
import { FavoriteService } from '../favorite/favorite.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkId } from '../utils/validate';
import { sendNotFound } from '../utils/handler-error';
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
    return this.trackRepository.find({ loadRelationIds: true });
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
    if (albumId)
      await this.albumService.getById(albumId);

    if (artistId)
      await this.artistService.getById(artistId);

    const track = { name: name, duration: duration, artistId: artistId, albumId: albumId };
    return this.trackRepository.save(track);
  }

  async update(id: string, { albumId, artistId, duration, name }: TrackDto): Promise<Track> {
    checkId(id);
    const track = await this.trackRepository.findOneBy({ id });
    if (!track)
      sendNotFound('Id doesn\'t exist');

    if (albumId)
      await this.albumService.getById(albumId);

    if (artistId)
      await this.artistService.getById(artistId);

    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
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
