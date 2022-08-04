import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { AlbumDto } from './dto/album.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Album')
@Controller('album')
@UseGuards(JwtAuthGuard)
export class AlbumController {
  constructor(private albumService: AlbumService) {
  }

  @Get()
  @ApiOperation({ summary: 'Get albums list' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: [Album] })
  getAll(): Promise<Album[]> {
    return this.albumService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: Album })
  @ApiResponse({ status: 400, description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album was not found' })
  getById(@Param('id') id: string): Promise<Album> {
    return  this.albumService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new album' })
  @ApiResponse({ status: 201, description: 'Album is created', type: Album })
  @ApiResponse({ status: 400, description: 'Bad request. body does not contain required fields' })
  @ApiBody({ type: AlbumDto })
  creat(@Body() createAlbum: AlbumDto): Promise<Album> {
    return this.albumService.create(createAlbum);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album information' })
  @ApiResponse({ status: 200, description: 'The album has been updated', type: Album })
  @ApiResponse({ status: 400, description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album was not found' })
  @ApiBody({ type: AlbumDto })
  update(@Param('id') id: string, @Body() updateAlbum: AlbumDto): Promise<Album> {
    return this.albumService.update(id, updateAlbum);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<any> {
    return this.albumService.remove(id);
  }
}
