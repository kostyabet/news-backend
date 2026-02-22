import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/prisma.service';
import { ArticleRequestTo } from '../../../dto/articles/ArticleRequestTo.dto';
import { ArticleResponseTo } from '../../../dto/articles/ArticleResponseTo.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async createArticle(article: ArticleRequestTo): Promise<ArticleResponseTo> {
    return this.prisma.article.create({
      data: {
        a_content: article.content,
        a_title: article.title,
        a_slug: article.slug,

        a_status: 1,
        a_moderator: 0,
        a_language: 1,
        a_author: 0,
      },
    });
  }

  async getAllArticles(): Promise<ArticleResponseTo[]> {
    return this.prisma.article.findMany();
  }
}
