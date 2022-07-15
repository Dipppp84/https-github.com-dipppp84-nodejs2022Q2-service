import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: String): String {
    return this.userService.getById(id);
  }

  @Post()
  creat(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Put(':id')
  update(@Param('id') id: String, @Body() updateUser: UpdateUserDto): String {
    return `update oldPassword = ${updateUser.oldPassword}, newPassword ${updateUser.newPassword} \n id = ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: String): String {
    return 'delete ' + id;
  }
}
