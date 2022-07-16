import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { sendBadRequest, sendForbidden } from '../utils/handler-error';
import { checkIdAndEntity } from '../utils/validate';

@Injectable()
export class UserService {

  private users = new Map<string, User>();

  getAll(): User[] {
    return Array.from(this.users.values());
  }

  getById(id: string): User {
    return checkIdAndEntity(id, this.users);
  }

  create(createUser: CreateUserDto): User {
    if (!createUser.login || !createUser.password)
      sendBadRequest('body does not contain required fields');
    const user: User = new User({
      id: uuidv4(),
      login: createUser.login,
      password: createUser.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.users.set(user.id, user);
    return user;
  }

  update(id: string, updateUser: UpdateUserDto): User {
    const user = checkIdAndEntity(id, this.users);
    if (user.password === updateUser.oldPassword)
      user.password = updateUser.newPassword;
    else sendForbidden('oldPassword is wrong');
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string) {
    checkIdAndEntity(id, this.users);
    this.users.delete(id);
  }

}


