import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Favorite {
  constructor(partial: Partial<Favorite>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;
  @ApiProperty({ type: [Artist] })
  @ManyToMany(() => Artist, { onDelete: 'SET NULL' })
  @JoinTable()
  artists: Artist[];
  @ApiProperty({ type: [Album] })
  @ManyToMany(() => Album, { onDelete: 'SET NULL' })
  @JoinTable()
  albums: Album[];
  @ApiProperty({ type: [Track] })
  @ManyToMany(() => Track, { onDelete: 'SET NULL' })
  @JoinTable()
  tracks: Track[];
}