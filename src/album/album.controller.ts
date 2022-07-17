import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { AlbumDto } from './dto/album.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {
  }

  @Get()
  @ApiOperation({ summary: 'Get albums list' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: [Album] })
  getAll(): Album[] {
    return this.albumService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: Album })
  @ApiResponse({ status: 400, description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album was not found' })
  getById(@Param('id') id: string): Album {
    return this.albumService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new album' })
  @ApiResponse({ status: 201, description: 'Album is created', type: AlbumDto })
  @ApiResponse({ status: 400, description: 'Bad request. body does not contain required fields' })
  @ApiBody({ type: AlbumDto })
  creat(@Body() createAlbum: AlbumDto): Album {
    return this.albumService.create(createAlbum);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album information' })
  @ApiResponse({ status: 200, description: 'The album has been updated', type: Album })
  @ApiResponse({ status: 400, description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album was not found' })
  @ApiBody({ type: AlbumDto })
  update(@Param('id') id: string, @Body() updateAlbum: AlbumDto): Album {
    return this.albumService.update(id, updateAlbum);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.albumService.remove(id);
  }
}
