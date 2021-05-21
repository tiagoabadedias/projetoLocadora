import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  createdAt: string;
}
