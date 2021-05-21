import { AbstractService } from '../shared/abstract/abstract.service';
import { Inject, Injectable } from '@nestjs/common';
import { FilmMapper } from './dto/film.mapper';
import { FilmDto } from './dto/film.dto';
import { Film } from './film.entity';
import { Op } from "sequelize";

@Injectable()
export class FilmService extends AbstractService<Film, FilmDto>{
  constructor (
    @Inject('FILM_REPOSITORY') protected readonly filmRepository: typeof Film, protected mapper: FilmMapper
  ) {
    super(filmRepository, mapper)
  }

  async findOneByTitle(title: string) {

    let film = await Film.findAll<Film>({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      }
    });

    return film;
  }
}
