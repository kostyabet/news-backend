import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRefreshTo {
  @ApiProperty({
    example: '12345....',
    description: 'User refresh token',
  })
  @IsString()
  refreshToken: string;
}
