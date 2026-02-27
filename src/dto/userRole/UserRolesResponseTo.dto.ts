import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRolesResponseTo {
  @Expose({ name: 'id', toPlainOnly: true })
  @ApiProperty({ example: 1, description: 'User role ID' })
  ur_id: number;

  @Expose({ name: 'role', toPlainOnly: true })
  @ApiProperty({
    example: 'AUTHOR',
    description: 'User role name',
  })
  ur_role: string;

  @Exclude()
  ur_category?: string;
  @Exclude()
  ur_public?: boolean;
}
