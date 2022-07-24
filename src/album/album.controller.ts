import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { AlbumDto } from './dto/album.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumResponseDto } from './dto/album.response.dto';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {
  }

  @Get()
  @ApiOperation({ summary: 'Get albums list' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: [AlbumResponseDto] })
  async getAll(): Promise<AlbumResponseDto[]> {
    const all = await this.albumService.getAll();
    return all.map(album => album.toResponse());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: AlbumResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album was not found' })
  async getById(@Param('id') id: string): Promise<AlbumResponseDto> {
    return (await this.albumService.getById(id)).toResponse();
  }

  @Post()
  @ApiOperation({ summary: 'Add new album' })
  @ApiResponse({ status: 201, description: 'Album is created', type: AlbumResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request. body does not contain required fields' })
  @ApiBody({ type: AlbumDto })
  async creat(@Body() createAlbum: AlbumDto): Promise<AlbumResponseDto> {
    return (await this.albumService.create(createAlbum)).toResponse();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album information' })
  @ApiResponse({ status: 200, description: 'The album has been updated', type: AlbumResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request. albumId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Album was not found' })
  @ApiBody({ type: AlbumDto })
  async update(@Param('id') id: string, @Body() updateAlbum: AlbumDto): Promise<AlbumResponseDto> {
    return (await this.albumService.update(id, updateAlbum)).toResponse();
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
