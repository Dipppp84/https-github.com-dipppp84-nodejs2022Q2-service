import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './entities/artist.entity';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {
  }

  @Get()
  getAll(): Artist[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Artist {
    return this.artistService.getById(id);
  }

  @Post()
  creat(@Body() createArtist: ArtistDto) {
    return this.artistService.create(createArtist);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtist: ArtistDto): Artist {
    return this.artistService.update(id, updateArtist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.artistService.remove(id);
  }
}
