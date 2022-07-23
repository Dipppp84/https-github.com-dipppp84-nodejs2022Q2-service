import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { sendBadRequest, sendForbidden, sendNotFound } from '../utils/handler-error';
import { checkId } from '../utils/validate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
              private usersRepository: Repository<User>) {
  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getById(id: string): Promise<User> {
    checkId(id);
    const user = await this.usersRepository.findOneBy({id});
    if (!user)
      sendNotFound('Id doesn\'t exist');
    return this.usersRepository.findOneBy({id});
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.login || !createUserDto.password)
      sendBadRequest('body does not contain required fields');
    const date = Date.now();
    const createUser: User = new User({
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });
    return this.usersRepository.save(createUser);
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<User> {
    checkId(id);
    const user = await this.usersRepository.findOneBy({id});
    if (!user)
      sendNotFound('Id doesn\'t exist');

    if (user.password === updateUser.oldPassword)
      user.password = updateUser.newPassword;
    else sendForbidden('oldPassword is wrong');
    user.version += 1;
    user.updatedAt = Date.now();
    const save = await this.usersRepository.save(user);
    save.createdAt = Number(save.createdAt);//Костыль, save возвращает bigDate как строку
    return save
  }

  async remove(id: string): Promise<any> {
    checkId(id);
    const user = await this.usersRepository.findOneBy({id});
    if (!user)
      sendNotFound('Id doesn\'t exist');
    return this.usersRepository.delete(id)
  }
}


