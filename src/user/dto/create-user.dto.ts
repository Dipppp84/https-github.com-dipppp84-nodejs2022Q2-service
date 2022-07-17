import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  login: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}