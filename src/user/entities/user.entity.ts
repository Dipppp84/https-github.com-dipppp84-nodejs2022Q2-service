import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: string;
  @ApiProperty()
  login: string;
  @Exclude()
  @ApiProperty()
  password: string;
  @ApiProperty()
  version: number;
  @ApiProperty()
  createdAt: number;
  @ApiProperty()
  updatedAt: number;
}
