import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/prisma.service';
import { UserRolesResponseTo } from '../../../dto/userRole/UserRolesResponseTo.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRolesService {
  constructor(private prisma: PrismaService) {}

  async getPublicRoles(): Promise<UserRolesResponseTo[]> {
    const roles = await this.prisma.userRole.findMany({
      where: {
        ur_public: true,
      },
    });
    return plainToInstance(UserRolesResponseTo, roles);
  }
}
