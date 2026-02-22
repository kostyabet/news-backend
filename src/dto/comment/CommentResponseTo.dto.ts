import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommentResponseTo {
  @Expose({ name: 'id', toPlainOnly: true })
  @ApiProperty({ example: 1, description: 'Comment ID' })
  c_id: number;

  @Expose({ name: 'userId', toPlainOnly: true })
  @ApiProperty({
    example: 1,
    description: 'Id of the user which create this comment',
  })
  c_user: number;

  @Expose({ name: 'parentId', toPlainOnly: true })
  @ApiPropertyOptional({
    example: 1,
    description: 'Id of the parent comment',
  })
  c_parent: number | null;

  @Expose({ name: 'message', toPlainOnly: true })
  @ApiProperty({
    example: 'This comment is about...',
    description: 'Text of the comment',
  })
  c_message: string;

  @Exclude()
  c_article: number;
}
