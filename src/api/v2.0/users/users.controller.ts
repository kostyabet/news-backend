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
}
