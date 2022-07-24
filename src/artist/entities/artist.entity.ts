import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  constructor(name: string, grammy: boolean = false) {
    this.name = name;
    this.grammy = grammy;
  }

  @ApiProperty({name:'uuid'})
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  grammy: boolean;
}
