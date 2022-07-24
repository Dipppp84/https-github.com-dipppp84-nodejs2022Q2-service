import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { checkId } from '../utils/validate';
import { AlbumDto } from './dto/album.dto';
import { FavoriteService } from '../favorite/favorite.service';
import { ArtistService } from '../artist/artist.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sendNotFound } from '../utils/handler-error';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {

  constructor(@Inject(forwardRef(() => TrackService))
              private trackService: TrackService,
              @Inject(forwardRef(() => FavoriteService))
              private favoriteService: FavoriteService,
              @Inject(forwardRef(() => ArtistService))
              private artistService: ArtistService,
              @InjectRepository(Album)
              private albumRepository: Repository<Album>) {
  }

  async getAll(): Promise<Album[]> {
    return this.albumRepository.find({ loadRelationIds: true });
  }

  async getById(id: string): Promise<Album> {
    checkId(id);
    const album = await this.albumRepository.findOne({
      where: { id: id },
      loadRelationIds: true,
    });
    if (!album)
      sendNotFound('Id doesn\'t exist');
    return album;
  }

  async create({ artistId, name, year }: AlbumDto): Promise<Album> {
    if (artistId)
      await this.artistService.getById(artistId);

    const album = { name: name, year: year, artistId: artistId };
    return this.albumRepository.save(album);
  }

  async update(id: string, { artistId, name, year }: AlbumDto): Promise<Album> {
    checkId(id);
    const album = await this.albumRepository.findOneBy({ id });
    if (!album)
      sendNotFound('Id doesn\'t exist');

    if (artistId)
      await this.artistService.getById(artistId);

    album.name = name;
    album.year = year;
    album.artistId = artistId;
    return this.albumRepository.save(album);
  }

  async remove(id: string): Promise<any> {
    checkId(id);
    const album = await this.albumRepository.findOneBy({ id });
    if (!album)
      sendNotFound('Id doesn\'t exist');

    return this.albumRepository.delete(id);
  }
}
