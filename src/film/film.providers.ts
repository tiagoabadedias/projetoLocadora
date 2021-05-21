import { Film } from './film.entity';

export const filmProviders = [
  {
    provide: 'FILM_REPOSITORY',
    useValue: Film,
  },
];
