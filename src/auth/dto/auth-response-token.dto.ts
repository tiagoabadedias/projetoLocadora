import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseTokenDto {
  @ApiProperty()
  acessToken: string;
}
