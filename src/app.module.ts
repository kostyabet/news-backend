import { Module } from '@nestjs/common';
import { V1AppModule } from './api/v1.0/v1.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    V1AppModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'v1.0',
            module: V1AppModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
