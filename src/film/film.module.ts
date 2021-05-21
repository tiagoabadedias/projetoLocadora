import { FilmController } from './film.controller';
import { PassportModule } from '@nestjs/passport';
import { filmProviders } from './film.providers';
import { FilmMapper } from './dto/film.mapper';
import { FilmService } from './film.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ 
    PassportModule.register({defaultStrategy: "jwt"}),
  ],
  controllers: [FilmController],
  providers: [FilmService, ...filmProviders, FilmMapper],
  exports:[FilmService]
})
export class FilmModule {}
