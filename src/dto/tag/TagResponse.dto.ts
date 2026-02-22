import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagResponseDto {
  @Expose({ name: 'id', toPlainOnly: true })
  @ApiProperty({ example: 1, description: 'Tag ID' })
  t_id: number;

  @Expose({ name: 'tag', toPlainOnly: true })
  @ApiProperty({ example: 'В ожидании', description: 'Caption of the tag' })
  t_tag: string;
}
