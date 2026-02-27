import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ArticlesModule,
    RouterModule.register([
      {
        path: 'v2.0/articles',
        module: ArticlesModule,
      },
    ]),
  ],
})
export class V2AppModule {}
