import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  id: string;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}
