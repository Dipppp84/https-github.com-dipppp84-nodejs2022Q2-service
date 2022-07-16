import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {
  }

  @Get()
  getAll(): Album[] {
    return this.albumService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Album {
    return this.albumService.getById(id);
  }

  @Post()
  creat(@Body() createAlbum: AlbumDto) {
    return this.albumService.create(createAlbum);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbum: AlbumDto): Album {
    return this.albumService.update(id, updateAlbum);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.albumService.remove(id);
  }
}
