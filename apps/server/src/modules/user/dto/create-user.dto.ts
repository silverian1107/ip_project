import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user' })
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'securepassword123',
  })
  password: string;

  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  fullName: string;

  @ApiPropertyOptional({
    description: 'Avatar URL of the user',
    example: 'http://example.com/avatar.jpg',
  })
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'Bio of the user',
    example: 'A brief description about the user',
  })
  bio?: string;

  @ApiPropertyOptional({
    description: 'Location of the user',
    example: 'New York, USA',
  })
  location?: string;

  @ApiPropertyOptional({
    description: 'Birth date of the user',
    example: '1990-01-01',
  })
  birthDate?: Date;
}
