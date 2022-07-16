import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';
import { TrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {
  }

  @Get()
  getAll(): Track[] {
    return this.trackService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Track {
    return this.trackService.getById(id);
  }

  @Post()
  creat(@Body() createTrack: TrackDto) {
    return this.trackService.create(createTrack);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrack: TrackDto): Track {
    return this.trackService.update(id, updateTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.trackService.remove(id);
  }
}
