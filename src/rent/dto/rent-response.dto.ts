import { ApiProperty } from '@nestjs/swagger';

export class RentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  UserId: string;

  @ApiProperty()
  FilmId: string;

  @ApiProperty()
  isRent: boolean;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  createdAt: string;
}
