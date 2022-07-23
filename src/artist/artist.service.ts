import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { checkId, checkIdAndEntityOld } from '../utils/validate';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { FavoriteService } from '../favorite/favorite.service';
import { AlbumService } from '../album/album.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { sendNotFound } from '../utils/handler-error';

//const artistes = new Map<string, Artist>;

@Injectable()
export class ArtistService {

  constructor(@Inject(forwardRef(() => TrackService))
              private trackService: TrackService,
              @Inject(forwardRef(() => FavoriteService))
              private favoriteService: FavoriteService,
              @Inject(forwardRef(() => AlbumService))
              private albumService: AlbumService,
              @InjectRepository(User)
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
    const artist: Artist = {
      id: '',
      name: createArtist.name,
      grammy: createArtist.grammy,
    };
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

    await Promise.all([
      this.trackService.simpleRemoveArtisAndAlbum(id),
      this.albumService.simpleRemoveArtis(id),
      this.favoriteService.simpleRemoveArtist(id)]);

    return this.artistRepository.delete(id);
  }
}
