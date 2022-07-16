import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  albumId: string | null;
  @IsNumber()
  duration: number;
}