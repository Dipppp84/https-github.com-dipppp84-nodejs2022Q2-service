import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Favorite } from './entities/favorite.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Favorite')
@Controller('favs')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get favorite' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: Favorite })
  getAll(): Promise<Favorite> {
    return this.favoriteService.getAll();
  }

  @Post('/album/:id')
  @ApiOperation({ summary: 'Add album to the favorites' })
  @ApiResponse({ status: 201, description: 'Added successfully' })
  @ApiResponse({ status: 400, description: 'Bad. albumId is invalid (not uuid)' })
  @ApiResponse({ status: 400, description: 'Album with id doesn\'t exist' })
  setAlbum(@Param('id') id: string): Promise<void> {
    return this.favoriteService.setAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album was not found' })
  removeAlbum(@Param('id') id: string): Promise<void> {
    return this.favoriteService.removeAlbum(id);
  }

  @Post('/track/:id')
  @ApiOperation({ summary: 'Add track to the favorites' })
  @ApiResponse({ status: 201, description: 'Track successfully' })
  @ApiResponse({ status: 400, description: 'Bad. trackId is invalid (not uuid)' })
  @ApiResponse({ status: 400, description: 'Track with id doesn\'t exist' })
  setTrack(@Param('id') id: string): Promise<void> {
    return this.favoriteService.setTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track was not found' })
  removeTrack(@Param('id') id: string): Promise<void> {
    return this.favoriteService.removeTrack(id);
  }

  @Post('/artist/:id')
  @ApiOperation({ summary: 'Add artist to the favorites' })
  @ApiResponse({ status: 201, description: 'Track successfully' })
  @ApiResponse({ status: 400, description: 'Bad. artistId is invalid (not uuid)' })
  @ApiResponse({ status: 400, description: 'Artist with id doesn\'t exist' })
  setArtist(@Param('id') id: string): Promise<void> {
    return this.favoriteService.setArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request. artistId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Artist was not found' })
  removeArtist(@Param('id') id: string): Promise<void> {
    return this.favoriteService.removeArtist(id);
  }
}
