import { ApiProperty } from '@nestjs/swagger';

export class FilmResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: String;

  @ApiProperty()
  editor: String;

  @ApiProperty()
  copies: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
