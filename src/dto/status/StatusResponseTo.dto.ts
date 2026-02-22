import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class StatusResponseToDto {
  @Expose({ name: 'id', toPlainOnly: true })
  @ApiProperty({ example: 1, description: 'Status ID' })
  as_id: number;

  @Expose({ name: 'status', toPlainOnly: true })
  @ApiProperty({ example: 'В ожидании', description: 'Caption of the status' })
  as_status: string;
}
