import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { checkId } from '../utils/validate';
import { ArtistDto } from './dto/artist.dto';
import { TrackService } from '../track/track.service';
import { FavoriteService } from '../favorite/favorite.service';
import { AlbumService } from '../album/album.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sendNotFound } from '../utils/handler-error';

@Injectable()
export class ArtistService {

  constructor(@Inject(forwardRef(() => TrackService))
              private trackService: TrackService,
              @Inject(forwardRef(() => FavoriteService))
              private favoriteService: FavoriteService,
              @Inject(forwardRef(() => AlbumService))
              private albumService: AlbumService,
              @InjectRepository(Artist)
              private artistRepository: Repository<Artist>) {
  }

  async getAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async getById(id: string): Promise<Artist> {
    checkId(id);
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist)
      sendNotFound('Id doesn\'t exist');
    return artist;
  }

  async create(createArtist: ArtistDto): Promise<Artist> {
    const artist = new Artist(createArtist.name, createArtist.grammy);
    return this.artistRepository.save(artist);
  }

  async update(id: string, updateArtist: ArtistDto): Promise<Artist> {
    checkId(id);
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist)
      sendNotFound('Id doesn\'t exist');

    artist.name = updateArtist.name;
    artist.grammy = updateArtist.grammy;
    return this.artistRepository.save(artist);
  }

  async remove(id: string): Promise<any> {
    checkId(id);
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist)
      sendNotFound('Id doesn\'t exist');

    return this.artistRepository.delete(id);
  }
}
