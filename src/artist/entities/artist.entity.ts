import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class Artist {
  constructor(name: string, grammy: boolean = false) {
    this.name = name;
    this.grammy = grammy;
  }

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  grammy: boolean;
/*  @OneToMany(() => Album, (album: Album) => album.artist, { cascade: true })
  albums: Album[];*/
}
