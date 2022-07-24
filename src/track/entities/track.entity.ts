import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { TrackResponseDto } from '../dto/track.response.dto';
import { getAlbumId, getArtistId } from '../../utils/get-inner-entity-as-id';

@Entity()
export class Track {
  constructor(name: string, duration: number, artist: Artist, album: Album) {
    this.name = name;
    this.duration = duration;
    this.artist = artist;
    this.album = album;
  }

  toResponse(): TrackResponseDto {
    const artistId = getArtistId<Track>(this);
    const albumId = getAlbumId<Track>(this);
    return {
      id: this.id, name: this.name, duration: this.duration,
      artistId: artistId, albumId: albumId,
    };
  }

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty({ nullable: true })
  @ManyToOne(() => Artist, (artist: Artist) => artist.id,
    { onDelete: 'SET NULL' })
  artist: Artist | string | null;
  @ApiProperty({ nullable: true })
  @ManyToOne(() => Album, (album: Album) => album.id,
    { onDelete: 'SET NULL' })
  album: Album | string | null;
  @ApiProperty()
  @Column({ type: 'int' })
  duration: number;
}