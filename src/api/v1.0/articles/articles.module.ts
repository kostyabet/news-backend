import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../../../services/prisma.service';
import { ArticlesController } from './articles.controller';

@Module({
  imports: [],
  controllers: [ArticlesController],
  providers: [ArticlesService, PrismaService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
