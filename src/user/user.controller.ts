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
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getById(@Param('id') id: string): User {
    return this.userService.getById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  creat(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto): User {
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.userService.remove(id);
  }
}
