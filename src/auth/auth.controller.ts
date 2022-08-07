import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode, HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from './ dto/token.dto';
import { RequestRefreshTokenDto } from './ dto/request-refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
              private userService: UserService) {
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Track is created', type: User })
  @ApiResponse({ status: 400, description: 'Bad request. body does not contain required fields' })
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.create(createUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Send \'login\' and \'password\' to get Access token and Refresh token' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: TokenDto })
  @ApiResponse({ status: 400, description: 'Bad request. DTO is invalid' })
  @ApiResponse({ status: 403, description: 'Authentication failed' })
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req): Promise<TokenDto> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  @ApiOperation({ summary: 'Send \'login\' and \'password\' to get Access token and Refresh token' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: TokenDto })
  @ApiResponse({ status: 400, description: 'Refresh token is invalid' })
  @ApiResponse({ status: 403, description: 'Refresh token is invalid or expired' })
  @ApiBody({ type: RequestRefreshTokenDto })
  async refresh(@Body() { refreshToken }: RequestRefreshTokenDto): Promise<TokenDto> {
    return this.authService.refresh(refreshToken);
  }
}
