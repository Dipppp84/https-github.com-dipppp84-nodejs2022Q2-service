import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { checkId } from '../utils/validate';
import { AlbumDto } from './dto/album.dto';
import { FavoriteService } from '../favorite/favorite.service';
import { ArtistService } from '../artist/artist.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { sendNotFound } from '../utils/handler-error';
import { Album } from './entities/album.entity';
import { AlbumResponseDto } from './dto/album.response.dto';

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

  async getAll(): Promise<AlbumResponseDto[]> {
    const all = await this.albumRepository.find({loadRelationIds: true});
    return all.map(album => album.toResponse());
  }

  async getById(id: string): Promise<AlbumResponseDto> {
    checkId(id);
    const album = await this.albumRepository.findOne({ where: { id: id },
      loadRelationIds: true });
    if (!album)
      sendNotFound('Id doesn\'t exist');
    return album.toResponse();
  }

  async create({ artistId, name, year }: AlbumDto): Promise<AlbumResponseDto> {
    let artist: Artist = null;
    if (artistId)
      artist = await this.artistService.getById(artistId);

    const album = new Album(name, year, artist);
    return (await this.albumRepository.save(album)).toResponse();
  }

  async update(id: string, { artistId, name, year }: AlbumDto): Promise<AlbumResponseDto> {
    checkId(id);
    const album = await this.albumRepository.findOneBy({ id });
    if (!album)
      sendNotFound('Id doesn\'t exist');

    let artist: Artist = null;
    if (artistId)
      artist = await this.artistService.getById(artistId);

    album.name = name;
    album.year = year;
    album.artist = artist;
    return (await this.albumRepository.save(album)).toResponse();
  }

  async remove(id: string): Promise<any> {
    checkId(id);
    const album = await this.albumRepository.findOneBy({ id });
    if (!album)
      sendNotFound('Id doesn\'t exist');
    /*    const tracks = this.trackService.getAll();
        const track = tracks.find(value => value.albumId === id);
        if (track) {
          track.artistId = null;
          track.albumId = null;
        }*/
    /*
        this.favoriteService.simpleRemoveAlbum(id);
    */
    return this.albumRepository.delete(id);
  }

  /*  async simpleRemoveArtis(id: string) {
      //todo delete ArtistID and AlbumID
    }*/
}
