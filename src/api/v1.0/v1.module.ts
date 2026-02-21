import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    // UsersModule,
    // ArticlesModule,
    // NoticesModule,
    // StickersModule,
    RouterModule.register([
      // {
      //   path: 'v1.0/users',
      //   module: UsersModule,
      // },
      // {
      //   path: 'v1.0/articles',
      //   module: ArticlesModule,
      // },
      // {
      //   path: 'v1.0/notices',
      //   module: NoticesModule,
      // },
      // {
      //   path: 'v1.0/stickers',
      //   module: StickersModule,
      // },
    ]),
  ],
})
export class V1AppModule {}
