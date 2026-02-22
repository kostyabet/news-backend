import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ArticleRequestTo {
  @ApiProperty({
    example: 'Hello, i want to say that...',
    description: 'Content of the Article',
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

  @ApiProperty({
    example: 'Slug of the article...',
    description: 'Slug of the Article',
  })
  @IsString()
  @MaxLength(50, {
    message: 'The content must be no more than 50 characters long',
  })
  slug: string;
}
