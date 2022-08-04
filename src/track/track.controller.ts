import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';
import { TrackDto } from './dto/track.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Track')
@Controller('track')
@UseGuards(JwtAuthGuard)
export class TrackController {
  constructor(private trackService: TrackService) {
  }

  @Get()
  @ApiOperation({ summary: 'Get track list' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: [Track] })
  getAll(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: Track })
  @ApiResponse({ status: 400, description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track was not found' })
  getById(@Param('id') id: string): Promise<Track> {
    return this.trackService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new track' })
  @ApiResponse({ status: 201, description: 'Track is created', type: Track })
  @ApiResponse({ status: 400, description: 'Bad request. body does not contain required fields' })
  @ApiBody({ type: TrackDto })
  creat(@Body() createTrack: TrackDto): Promise<Track> {
    return this.trackService.create(createTrack);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track information' })
  @ApiResponse({ status: 200, description: 'The track has been updated', type: Track })
  @ApiResponse({ status: 400, description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track was not found' })
  @ApiBody({ type: TrackDto })
  update(@Param('id') id: string, @Body() updateTrack: TrackDto): Promise<Track> {
    return this.trackService.update(id, updateTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track was not found' })
  remove(@Param('id') id: string): Promise<any> {
    return this.trackService.remove(id);
  }
}
