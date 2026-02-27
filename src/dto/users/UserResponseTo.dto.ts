import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseTo {
  @Expose({ name: 'id', toPlainOnly: true })
  @ApiProperty({ example: 1, description: 'Useer ID' })
  u_id: number;

  @Expose({ name: 'login', toPlainOnly: true })
  @ApiProperty({
    example: 'user1234',
    description: 'User login',
  })
  u_login: string;

  @Expose()
  role: string;

  @Exclude()
  u_password_hash?: string;
  @Exclude()
  u_settings?: number;
  @Exclude()
  u_role?: number;
}
