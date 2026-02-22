import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoResponseTo {
  @Expose({ name: 'email', toPlainOnly: true })
  @ApiProperty({
    example: 'test@test.test',
    description: 'User email for contact',
  })
  ui_email: string;

  @Expose({ name: 'avatar', toPlainOnly: true })
  @ApiProperty({
    example: 'https://.....',
    description: 'User avatar',
  })
  ui_avatar: string;

  @Expose({ name: 'firstName', toPlainOnly: true })
  @ApiProperty({
    example: 'Ivan',
    description: 'User first name',
  })
  ui_firstName: string;

  @Expose({ name: 'secondName', toPlainOnly: true })
  @ApiProperty({
    example: 'Ivanov',
    description: 'User second name',
  })
  ui_secondName: string;

  @Exclude()
  ui_user: number;
  @Exclude()
  ui_role: number;
}