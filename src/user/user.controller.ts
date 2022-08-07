import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get user list' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: [User] })
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: User })
  @ApiResponse({ status: 400, description: 'Bad request. userId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track was not found' })
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: 'Add new user' })
  @ApiResponse({ status: 201, description: 'Track is created', type: User })
  @ApiResponse({ status: 400, description: 'Bad request. body does not contain required fields' })
  @ApiBody({ type: CreateUserDto })
  creat(@Body() createUser: CreateUserDto): Promise<User>{
    return this.userService.create(createUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @ApiOperation({ summary: 'Update user information' })
  @ApiResponse({ status: 200, description: 'The user has been updated', type: User })
  @ApiResponse({ status: 400, description: 'Bad request. userId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track was not found' })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request. userId is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: 'Track was not found' })
  remove(@Param('id') id: string): Promise<any>{
    return this.userService.remove(id);
  }
}
