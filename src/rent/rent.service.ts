import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { AbstractService } from '../shared/abstract/abstract.service';
import { RentMapper } from './dto/rent.mapper';
import { Film } from '../film/film.entity';
import { RentDto } from './dto/rent.dto';
import { Rent } from './rent.entity';

@Injectable()
export class RentService extends AbstractService<Rent, RentDto>{
  constructor (
    @Inject('RENT_REPOSITORY') protected readonly rentRepository: typeof Rent, protected mapper: RentMapper
  ) {
    super(rentRepository, mapper)
  }

  async createRent(rentDto: RentDto, UserId: string) {
    let film: Film = await Film.findOne<Film>({
      where: { id: rentDto.FilmId }
    });
    
    let rents: Rent[] = await Rent.findAll({
      where: { FilmId: rentDto.FilmId, isRent: true }
    });

    const rentByUser = rents.find(rent => rent.UserId == UserId);
     
    if (rents.length < film.copies) {
    
      rentDto.isRent = true;
      rentDto.UserId = UserId;
      
      return await this.create(rentDto);
    
    } else {
      if (rentByUser) {
        throw new NotAcceptableException("Este filme já está alugado por este usuário!");
      } else {
        throw new NotAcceptableException("Este filme não está disponível no momento!");
      }
    }
  }

  async updateRentReturn(UserId: String, FilmId: String) {
    
    let where: any;
    
    where = { UserId, FilmId };

    let rentLoaded: Rent = await Rent.findOne<Rent>({
      where
    });
     
    if (rentLoaded) {
      rentLoaded.isRent = false;
      return await rentLoaded.save();
    } else {
      throw new NotAcceptableException("Não foi encontrado aluguél para o filme informado!");
    }
  }
}
