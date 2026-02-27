import { Module } from '@nestjs/common';
import { PrismaService } from '../../../services/prisma.service';
import { UserRolesService } from './userRoles.service';
import { UserRolesController } from './userRoles.controller';

@Module({
  imports: [],
  controllers: [UserRolesController],
  providers: [UserRolesService, PrismaService],
  exports: [UserRolesService],
})
export class UserRolesModule {}
