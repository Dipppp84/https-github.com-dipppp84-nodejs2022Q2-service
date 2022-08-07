import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Album {
  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }

  @ApiProperty({name:'uuid'})
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
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;
}