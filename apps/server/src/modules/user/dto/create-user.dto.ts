import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'john_doe@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}
