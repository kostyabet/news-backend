import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticleRequestTo } from '../../../dto/articles/ArticleRequestTo.dto';
import { ArticleResponseTo } from '../../../dto/articles/ArticleResponseTo.dto';

@Controller()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create new article' })
  @ApiBody({ description: 'New article fields', type: ArticleRequestTo })
  @ApiResponse({
    status: 201,
    description: 'Article created successfully.',
    type: ArticleResponseTo,
  })
  @ApiResponse({
    status: 401,
    description: 'User with userId not found.',
  })
  async createArticle(
    @Body() article: ArticleRequestTo,
  ): Promise<ArticleResponseTo> {
    return this.articlesService.createArticle(article);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: 200,
    description: 'All articles',
    type: [ArticleResponseTo],
  })
  @ApiResponse({
    status: 404,
    description: 'Articles not found',
  })
  async getAllArticles(): Promise<ArticleResponseTo[]> {
    return this.articlesService.getAllArticles();
  }
}
