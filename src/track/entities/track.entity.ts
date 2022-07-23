import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Track {
  /*  constructor(name: string, year: number, artist: Artist) {
      this.name = name;
      this.year = year;
      this.artist = artist;
    }*/
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @ApiProperty({ nullable: true })
  artistId: string | null;
  @ApiProperty({ nullable: true })
  albumId: string | null;
  @ApiProperty()
  duration: number;
}