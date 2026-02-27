import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRequestTo } from '../../../dto/users/UserRequestTo.dto';
import { UserResponseTo } from '../../../dto/users/UserResponseTo.dto';
import { UserSignInResponseTo } from '../../../dto/users/UserSignInResponseTo.dto';
import { UserRefreshTo } from '../../../dto/users/UserRefreshTo.dto';
import { UserLogInTo } from '../../../dto/users/UserLogInTo.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ description: 'New user fields', type: UserRequestTo })
  @ApiResponse({
    status: 201,
    description: 'Created user response',
    type: UserResponseTo,
  })
  @ApiResponse({
    status: 403,
    description: 'User with this login already exists',
  })
  async createUser(@Body() user: UserRequestTo): Promise<UserResponseTo> {
    return this.usersService.createUser(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ description: 'Login user', type: UserLogInTo })
  @ApiResponse({
    status: 200,
    description: 'Login user response',
    type: UserSignInResponseTo,
  })
  async login(@Body() user: UserLogInTo): Promise<UserSignInResponseTo> {
    return this.usersService.signInUser(user);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Get access and refresh user tokens' })
  @ApiBody({ description: 'Refresh token', type: UserRefreshTo })
  @ApiResponse({
    status: 200,
    description: 'User tokens',
    type: UserSignInResponseTo,
  })
  async refresh(@Body() refresh: UserRefreshTo): Promise<UserSignInResponseTo> {
    return this.usersService.refreshTokens(refresh);
  }
}
