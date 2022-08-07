import { ApiProperty } from '@nestjs/swagger';

export class RequestRefreshTokenDto {
  @ApiProperty()
  refreshToken: string;
}