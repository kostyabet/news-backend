import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageResponseTo {
  @Expose({ name: 'id', toPlainOnly: true })
  @ApiProperty({ example: 1, description: 'Language ID' })
  l_id: number;

  @Expose({ name: 'language', toPlainOnly: true })
  @ApiProperty({ example: 'English', description: 'Caption of the language' })
  l_language: string;
}
