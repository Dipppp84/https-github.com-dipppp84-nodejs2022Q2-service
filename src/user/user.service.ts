import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users = [];

  getAll() {
    return this.users;
  }

  getById(id: String) {
    return this.users.find(value => value.id === id);
  }

  create(createUser: CreateUserDto) {
    let number = this.users.push({
      ...createUser,
      id: uuidv4(),
    });
    return this.users[number - 1];
  }
}
