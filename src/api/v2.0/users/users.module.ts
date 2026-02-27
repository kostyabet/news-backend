import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../../../services/prisma.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../../strategies/jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
