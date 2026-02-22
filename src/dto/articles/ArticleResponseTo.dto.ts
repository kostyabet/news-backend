import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ArticleResponseTo {
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
  @ApiPropertyOptional({
    example: 'This is very big problem about article.',
    description: 'Slug of the Article',
  })
  a_slug: string | null;

  @Exclude()
  a_author?: number;
  @Exclude()
  a_status?: number;
  @Exclude()
  a_moderator?: number;
  @Exclude()
  a_language?: number;
}
