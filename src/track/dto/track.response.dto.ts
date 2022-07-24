import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TrackResponseDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  id: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  @ApiProperty({ nullable: true })
  artistId: string | null;
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  @ApiProperty({ nullable: true })
  albumId: string | null;
  @IsNumber()
  @ApiProperty()
  duration: number;
}