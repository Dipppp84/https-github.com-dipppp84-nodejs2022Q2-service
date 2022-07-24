import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class Track {
  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
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
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;
  @ApiProperty({ nullable: true })
  @ManyToOne(() => Album, (album: Album) => album.id,
    { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  albumId: string | null;
  @ApiProperty()
  @Column({ type: 'int' })
  duration: number;
}