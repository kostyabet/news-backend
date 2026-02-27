import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../services/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRequestTo } from '../../../dto/users/UserRequestTo.dto';
import { UserResponseTo } from '../../../dto/users/UserResponseTo.dto';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../../strategies/type';
import { UserSignInResponseTo } from '../../../dto/users/UserSignInResponseTo.dto';
import { UserRefreshTo } from '../../../dto/users/UserRefreshTo.dto';
import { UserLogInTo } from '../../../dto/users/UserLogInTo.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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

  async signInUser(user: UserLogInTo): Promise<UserSignInResponseTo> {
    const userDb = await this.prisma.user.findUnique({
      where: { u_login: user.login },
    });
    if (!userDb)
      throw new UnauthorizedException('User with this login not found');

    const isEqual = await bcrypt.compare(user.password, userDb.u_password_hash);
    if (!isEqual) {
      throw new UnauthorizedException();
    }

    const role = await this.prisma.userRole.findUnique({
      where: { ur_id: userDb.u_role },
    });
    if (!role) {
      throw new UnauthorizedException('User with this login not found');
    }

    return this.generateTokens(userDb.u_id, userDb.u_login, role.ur_role);
  }

  async refreshTokens(refresh: UserRefreshTo): Promise<UserSignInResponseTo> {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        refresh.refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        },
      );

      const user = await this.prisma.user.findUnique({
        where: { u_id: payload.sub },
      });
      if (!user) throw new UnauthorizedException();

      const role = await this.prisma.userRole.findUnique({
        where: { ur_id: user.u_role },
      });
      if (!role)
        throw new UnauthorizedException('User with this login not found');

      return this.generateTokens(user.u_id, user.u_login, role.ur_role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async generateTokens(userId: number, login: string, role: string) {
    const payload: JwtPayload = { sub: userId, login: login, role: role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET || 'access_secret',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
