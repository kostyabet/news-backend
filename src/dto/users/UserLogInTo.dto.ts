import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UserLogInTo {
  @ApiProperty({
    example: 'supersecret',
    description: 'User password',
  })
  @IsString()
  @MaxLength(64, {
    message: 'The password must be no more than 64 characters long',
  })
  @MinLength(8, {
    message: 'The password must be no less than 8 characters long',
  })
  password: string;

  @ApiProperty({
    example: 'user1234',
    description: 'User login',
  })
  @IsString()
  @MaxLength(30, {
    message: 'The login must be no more than 30 characters long',
  })
  @MinLength(4, {
    message: 'The login must be no less than 4 characters long',
  })
  login: string;
}
