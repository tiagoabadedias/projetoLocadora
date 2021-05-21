import { ApiProperty } from '@nestjs/swagger';

export class RentDto {
  id: string;

  UserId: string;

  @ApiProperty()
  FilmId: string;

  isRent: boolean;
}
