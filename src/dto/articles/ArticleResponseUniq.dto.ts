import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatusResponseToDto } from '../status/StatusResponseTo.dto';
import { LanguageResponseTo } from '../language/LanguageResponseTo.dto';
import { TagResponseDto } from '../tag/TagResponse.dto';
import { AuthorResponseTo } from '../author/AuthorResponseTo.dto';
import { CommentResponseTo } from '../comment/CommentResponseTo.dto';

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
  @Type(() => LanguageResponseTo)
  language: LanguageResponseTo;

  @Expose()
  @Type(() => StatusResponseToDto)
  status: StatusResponseToDto;

  @Expose()
  @Type(() => CommentResponseTo)
  comments: CommentResponseTo[];

  // @Expose()
  // // @Type(() => ReactionDto)
  // reactions: any[]; // Замените на ReactionDto[]

  @Expose()
  @Type(() => TagResponseDto)
  tags: TagResponseDto[]; // Замените на TagDto[]

  // @Expose()
  // // @Type(() => CategoryDto)
  // categories: any[]; // Замените на CategoryDto[]

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
