import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  oldPassword: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  newPassword: string;
}