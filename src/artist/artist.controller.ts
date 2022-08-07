import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './entities/artist.entity';
import { ArtistDto } from './dto/artist.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Artist')
@Controller('artist')
@UseGuards(JwtAuthGuard)
export class ArtistController {
  constructor(private artistService: ArtistService) {
  }

  @Get()
  @ApiOperation({ summary: 'Get artist list' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: [Artist] })
  getAll(): Promise<Artist[]> {
    return this.artistService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: Artist })
  @ApiResponse({ status: 400, description: 'Bad request. artistId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Artist was not found' })
  getById(@Param('id') id: string): Promise<Artist> {
    return this.artistService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new artist' })
  @ApiResponse({ status: 201, description: 'Artist is created', type: Artist })
  @ApiResponse({ status: 400, description: 'Bad request. body does not contain required fields' })
  @ApiBody({ type: ArtistDto })
  creat(@Body() createArtist: ArtistDto): Promise<Artist> {
    return this.artistService.create(createArtist);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist information' })
  @ApiResponse({ status: 200, description: 'The artist has been updated', type: Artist })
  @ApiResponse({ status: 400, description: 'Bad request. artistId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Artist was not found' })
  @ApiBody({ type: ArtistDto })
  update(@Param('id') id: string, @Body() updateArtist: ArtistDto): Promise<Artist> {
    return this.artistService.update(id, updateArtist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request. artistId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Artist was not found' })
  remove(@Param('id') id: string): Promise<any> {
    return this.artistService.remove(id);
  }
}
