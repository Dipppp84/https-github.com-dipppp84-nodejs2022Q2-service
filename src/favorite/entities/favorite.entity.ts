import { ApiProperty } from '@nestjs/swagger';

export class Favorite {
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
  @ApiProperty()
  artists: string[];
  @ApiProperty()
  albums: string[];
  @ApiProperty()
  tracks: string[];
}