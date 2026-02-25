import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatusResponseToDto } from '../status/StatusResponseTo.dto';
import { LanguageResponseTo } from '../language/LanguageResponseTo.dto';
import { TagResponseDto } from '../tag/TagResponse.dto';
import { AuthorResponseTo } from '../author/AuthorResponseTo.dto';
import { CommentResponseTo } from '../comment/CommentResponseTo.dto';
import { ReactionResponseTo } from '../reaction/ReactionResponseTo.dto';

export class ArticleResponseUniqDto {
  @Expose({ name: 'id', toPlainOnly: true })
  @ApiProperty({ example: 1, description: 'Article ID' })
  a_id: number;

  @Expose({ name: 'title', toPlainOnly: true })
  @ApiProperty({
    example: 'Global warm',
    description: 'Title of the Article',
  })
  a_title: string;

  @Expose({ name: 'content', toPlainOnly: true })
  @ApiProperty({
    example: 'Content of the article...',
    description: 'Content of the Article',
  })
  a_content: string;

  @Expose({ name: 'slug', toPlainOnly: true })
  @ApiProperty({
    example: 'This is very big problem about article.',
    description: 'Slug of the Article',
  })
  a_slug: string | null;

  // --- Objects ---
  @Expose()
  @Type(() => AuthorResponseTo)
  author: AuthorResponseTo;

  @Expose()
  language: string;

  @Expose()
  @Type(() => StatusResponseToDto)
  status: string;

  @Expose()
  @Type(() => CommentResponseTo)
  comments: CommentResponseTo[];

  @Expose()
  reactions: number;

  @Expose()
  tags: string[];

  @Expose()
  categories: string[];

  // --- Delete ---
  @Exclude()
  a_author?: number;
  @Exclude()
  a_status?: number;
  @Exclude()
  a_moderator?: number;
  @Exclude()
  a_language?: number;
}
