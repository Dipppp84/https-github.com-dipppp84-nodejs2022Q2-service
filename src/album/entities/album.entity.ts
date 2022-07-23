import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { AlbumResponseDto } from '../dto/album.response.dto';

@Entity()
export class Album {
  constructor(name: string, year: number, artist: Artist) {
    this.name = name;
    this.year = year;
    this.artist = artist;
  }

  toResponse(): AlbumResponseDto {
    let artistId = null;
    if (typeof this.artist === 'string')
      artistId = this.artist;
    else if (this.artist instanceof Artist)
      artistId = this.artist.id;
    return { id: this.id, name: this.name, year: this.year, artistId: artistId };
  }

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @Column({ type: 'int' })
  year: number;
  @ApiProperty({ nullable: true })
  @ManyToOne(() => Artist, (artist: Artist) => artist.id,
    { onDelete: 'SET NULL' })
  artist: Artist | string | null;
}