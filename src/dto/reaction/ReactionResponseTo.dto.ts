import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReactionResponseTo {
  @Expose({ name: 'userId', toPlainOnly: true })
  @ApiProperty({ example: 1, description: 'Id of user which send reaction' })
  r_user: number;

  @Expose({ name: 'type', toPlainOnly: true })
  @ApiProperty({ example: 'Like', description: 'User reaction type' })
  r_type: string;

  @Exclude()
  r_article?: number;
}
