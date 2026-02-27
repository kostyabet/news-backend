import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { UserRolesModule } from './userRoles/userRoles.module';

@Module({
  imports: [
    ArticlesModule,
    UsersModule,
    UserRolesModule,
    RouterModule.register([
      {
        path: 'v2.0/articles',
        module: ArticlesModule,
      },
      {
        path: 'v2.0/users',
        module: UsersModule,
      },
      {
        path: 'v2.0/user-roles',
        module: UserRolesModule,
      },
    ]),
  ],
})
export class V2AppModule {}
