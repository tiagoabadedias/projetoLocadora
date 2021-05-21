import { Controller, Get, ValidationPipe, Body, UseGuards, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { AbstractController } from '../shared/abstract/abstract.controller';
import { FilmService } from './film.service';
import { AuthGuard } from '@nestjs/passport';
import { FilmDto } from './dto/film.dto';
import { FilmResponseDto } from './dto/film-response.dto';
import { Film } from './film.entity';

@Controller('film')
@ApiTags('film')
@UseGuards(AuthGuard())
@ApiBearerAuth('token')
export class FilmController extends AbstractController<Film, FilmDto> {
  constructor(private readonly filmService: FilmService) {
    super(filmService)
  }

  @Get("/title/:title")
  @ApiOperation({ summary: 'movie search by title' })
  @ApiResponse({ status: 200, description: "Ok."})
  async findPerson(@Param('title') title: string): Promise<Film[]> {
    return await this.filmService.findOneByTitle(title)
  }

  @Post()
  @ApiBody({ type: FilmDto})
  @ApiOperation({ summary: 'create new movie' })
  @ApiCreatedResponse({ description: 'Successfully created.', type: FilmResponseDto })
  async create(@Body(ValidationPipe) entityDto: FilmDto): Promise<Film> {
      return await this.service.create(entityDto);
  }
}