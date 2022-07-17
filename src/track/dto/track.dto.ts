import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  @ApiProperty()
  @ApiProperty({
    nullable: true,
  })
  artistId: string | null;
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  @ApiProperty()
  @ApiProperty({
    nullable: true,
  })
  albumId: string | null;
  @IsNumber()
  @ApiProperty()
  duration: number;
}