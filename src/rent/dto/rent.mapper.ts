import { MapperInterface } from "src/shared/interface/mapper.interface";
import { Injectable } from "@nestjs/common";
import { Rent } from "../rent.entity";
import { RentDto } from "./rent.dto";
import uuid = require("uuid");

@Injectable()
export class RentMapper implements MapperInterface<Rent, RentDto> {
    
    public toEntity(entityDto: RentDto): Rent {
        let entity: Rent = new Rent();

        entity.id = uuid();
        entity.UserId = entityDto.UserId;
        entity.FilmId = entityDto.FilmId;
        entity.isRent = entityDto.isRent;

        return entity;
    }

    public toDto(entity: Rent): RentDto {
        let dto: RentDto = new RentDto();

        dto.id = entity.id;
        dto.UserId = entity.UserId;
        dto.FilmId = entity.FilmId;
        

        return dto;
    }
}