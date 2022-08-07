import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteDto {
  @ApiProperty({type: [Artist]})
  artists: Artist[];
  @ApiProperty({type: [Album]})
  albums: Album[];
  @ApiProperty({type: [Track]})
  tracks: Track[];
}