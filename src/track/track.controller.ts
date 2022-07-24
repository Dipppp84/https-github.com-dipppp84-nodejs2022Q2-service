import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';
import { TrackDto } from './dto/track.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackResponseDto } from './dto/track.response.dto';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {
  }

  @Get()
  @ApiOperation({ summary: 'Get track list' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: [TrackResponseDto] })
  async getAll(): Promise<TrackResponseDto[]> {
    const all = await this.trackService.getAll();
    return all.map(track => track.toResponse());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: TrackResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track was not found' })
  async getById(@Param('id') id: string): Promise<TrackResponseDto> {
    return (await this.trackService.getById(id)).toResponse();
  }

  @Post()
  @ApiOperation({ summary: 'Add new track' })
  @ApiResponse({ status: 201, description: 'Track is created', type: TrackResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request. body does not contain required fields' })
  @ApiBody({ type: TrackDto })
  async creat(@Body() createTrack: TrackDto): Promise<TrackResponseDto> {
    return (await this.trackService.create(createTrack)).toResponse();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track information' })
  @ApiResponse({ status: 200, description: 'The track has been updated', type: TrackResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request. trackId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track was not found' })
  @ApiBody({ type: TrackDto })
  async update(@Param('id') id: string, @Body() updateTrack: TrackDto): Promise<TrackResponseDto> {
    return (await this.trackService.update(id, updateTrack)).toResponse();
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
