import { ApiProperty } from '@nestjs/swagger';

export class FilmDto {
  id: string;

  @ApiProperty()
  title: String;

  @ApiProperty()
  editor: String;

  @ApiProperty()
  copies: number;
}
