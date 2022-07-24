import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';

type ID = string | null;

/**get Id from "artist" as string or from "artist" as object,
 * if "Repository.find({loadRelationIds: true})"*/
export function getArtistId<T>(T): ID {
  let artistId = null;
  if (typeof T.artist === 'string')
    artistId = T.artist;
  else if (T.artist instanceof Artist)
    artistId = T.artist.id;
  return artistId;
}

/**get Id from "album" as string or from "album" as object,
 * if "Repository.find({loadRelationIds: true})"*/
export function getAlbumId<T>(T): ID {
  let albumId = null;
  if (typeof T.album === 'string')
    albumId = T.album;
  else if (T.album instanceof Album)
    albumId = T.album.id;
  return albumId;
}
