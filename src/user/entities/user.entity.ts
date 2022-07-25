import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ name: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  login: string;
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;
  @ApiProperty()
  @Column({ type: 'int' })
  version: number;
  @ApiProperty()
  @Column({ type: 'bigint' })
  createdAt: number;
  @ApiProperty()
  @Column({ type: 'bigint' })
  updatedAt: number;
}
