import { ApiProperty } from '@nestjs/swagger';

export class UserSignInResponseTo {
  @ApiProperty({
    example: '12345....',
    description: 'User access token',
  })
  accessToken: string;

  @ApiProperty({
    example: '12345....',
    description: 'User refresh token',
  })
  refreshToken: string;
}
