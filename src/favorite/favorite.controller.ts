import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDto } from './dto/favorite.dto';

@Controller('fav')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {
  }

  @Get()
  getAll(): FavoriteDto {
    return this.favoriteService.getAll();
  }

  @Post('/album/:id')
  setAlbum(@Param('id') id: string) {
    return this.favoriteService.setAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    this.favoriteService.removeAlbum(id);
  }

  @Post('/track/:id')
  setTrack(@Param('id') id: string) {
    return this.favoriteService.setTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    this.favoriteService.removeTrack(id);
  }

  @Post('/artist/:id')
  setArtist(@Param('id') id: string) {
    return this.favoriteService.setArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    this.favoriteService.removeArtist(id);
  }
}
