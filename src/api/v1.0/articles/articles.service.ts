import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../services/prisma.service';
import { ArticleRequestTo } from '../../../dto/articles/ArticleRequestTo.dto';
import { ArticleResponseTo } from '../../../dto/articles/ArticleResponseTo.dto';
import { plainToInstance } from 'class-transformer';
import { ArticleResponseUniqDto } from '../../../dto/articles/ArticleResponseUniq.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async createArticle(article: ArticleRequestTo): Promise<ArticleResponseTo> {
    const data = await this.prisma.article.create({
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

    return plainToInstance(ArticleResponseTo, data);
  }

  async getAllArticles(): Promise<ArticleResponseTo[]> {
    const articles = await this.prisma.article.findMany();

    return plainToInstance(ArticleResponseTo, articles);
  }

  async getArticleById(id: number): Promise<ArticleResponseUniqDto> {
    const article = await this.prisma.article.findUnique({
      where: { a_id: id },
      include: {
        author: {
          include: {
            userInfo: true,
          },
        },
        comments: true,
        reactions: true,
        tags: {
          include: {
            tag: true,
          },
        },
        categories: true,
        language: true,
        status: true,
      },
    });

    if (!article) {
      throw new NotFoundException('Article with id not found!');
    }

    const formattedArticle = {
      ...article,
      tags: article.tags.map((relation) => relation.tag),
    };

    return plainToInstance(ArticleResponseUniqDto, formattedArticle);
  }

  async updateArticle(
    id: number,
    article: ArticleRequestTo,
  ): Promise<ArticleResponseTo> {
    const id_article = await this.prisma.article.findUnique({
      where: { a_id: id },
    });
    if (!id_article) {
      throw new UnauthorizedException('Article with id not found!');
    }

    const updated_article = await this.prisma.article.update({
      where: { a_id: id },
      data: {
        a_content: article.content,
        a_title: article.title,
        a_slug: article.slug,
      },
    });

    return plainToInstance(ArticleResponseTo, updated_article);
  }

  async deleteArticle(id: number): Promise<void> {
    await this.prisma.article.delete({
      where: { a_id: id },
    });
  }
}
