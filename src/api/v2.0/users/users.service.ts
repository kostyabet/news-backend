import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRequestTo } from '../../../dto/users/UserRequestTo.dto';
import { UserResponseTo } from '../../../dto/users/UserResponseTo.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: UserRequestTo): Promise<UserResponseTo> {
    if (await this.prisma.user.findUnique({ where: { u_login: user.login } }))
      throw new ForbiddenException('User with this login already exists');

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const role = await this.prisma.userRole.findUnique({
      where: { ur_id: user.role, ur_public: true },
    });
    if (!role) {
      throw new ForbiddenException('User role does not exist');
    }

    const createdUser = await this.prisma.user.create({
      data: {
        u_login: user.login,
        u_password_hash: user.password,
        u_role: user.role,
      },
    });

    const formatedUser = {
      ...createdUser,
      role: role.ur_role,
    };

    return plainToInstance(UserResponseTo, formatedUser);
  }
}
