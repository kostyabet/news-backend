import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ArticleRequestTo {
  @ApiProperty({
    example: 'Global warm',
    description: 'Title of the Article',
  })
  @IsString()
  @MaxLength(50, {
    message: 'The title must be no more than 50 characters long',
  })
  title: string;

  @ApiProperty({
    example: 'Content of the article...',
    description: 'Content of the Article',
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    example: 'This is very big problem about article.',
    description: 'Slug of the Article',
  })
  @IsString()
  @MaxLength(50, {
    message: 'The content must be no more than 50 characters long',
  })
  slug?: string;
}
