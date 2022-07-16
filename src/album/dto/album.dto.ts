import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;
}