import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';

export class FavoriteDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}