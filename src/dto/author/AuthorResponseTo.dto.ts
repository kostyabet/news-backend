import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserInfoResponseTo } from '../userInfo/UserInfoResponseTo.dto';

export class AuthorResponseTo {
  @Expose({ name: 'id', toPlainOnly: true })
  @ApiProperty({ example: 1, description: 'User ID' })
  u_id: number;

  @Expose({ name: 'login', toPlainOnly: true })
  @ApiProperty({ example: 'test1234', description: 'User login' })
  u_login: string;

  @Expose()
  @Type(() => UserInfoResponseTo)
  userInfo: UserInfoResponseTo;

  @Exclude()
  u_password_hash: string;
  @Exclude()
  u_settings: string;
}
