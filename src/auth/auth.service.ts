import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './ dto/token.dto';
import { sendBadRequest, sendForbidden } from '../utils/handler-error';
import { PayloadDto } from './ dto/payload.dto';

const bcrypt = require('bcrypt'); //don't work import =(

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
              private jwtService: JwtService) {
  }

  async validateUser(login: string, password: string): Promise<User> {
    if (!login || !password)
      sendBadRequest('No \'login\' or \'password\', or they are not a strings');

    const user = await this.usersService.findByLogin(login);

    if (!user)
      sendForbidden('no user with such login');
    if (!bcrypt.compareSync(password, user.password))
      sendForbidden('password doesn\'t match actual one');

    return user;
  }

  async login(user: User): Promise<TokenDto> {
    const payload: PayloadDto = { login: user.login, userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async refresh(refreshToken: string): Promise<TokenDto> {
    if (!refreshToken)
      sendBadRequest('Refresh token is invalid');

    let verify : PayloadDto ;
    try {
      verify = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch (e) {
      sendForbidden('Refresh token is invalid or expired');
    }
    const user = await this.usersService.getById(verify.userId);
    return this.login(user);
  }
}
