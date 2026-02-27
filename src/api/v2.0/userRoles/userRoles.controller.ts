import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UserRolesService } from './userRoles.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRolesResponseTo } from '../../../dto/userRole/UserRolesResponseTo.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class UserRolesController {
  constructor(private readonly usersService: UserRolesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all public user roles' })
  @ApiResponse({
    status: 200,
    description: 'Get list of user roles',
    type: [UserRolesResponseTo],
  })
  async getPublicUserRoles(): Promise<UserRolesResponseTo[]> {
    return await this.usersService.getPublicRoles();
  }
}
