import { Rent } from './rent.entity';

export const rentProviders = [
  {
    provide: 'RENT_REPOSITORY',
    useValue: Rent,
  },
];
