import { MapperInterface } from "src/shared/interface/mapper.interface";
import { Injectable } from "@nestjs/common";
import { Film } from "../film.entity";
import { FilmDto } from "./film.dto";
import uuid = require("uuid");

@Injectable()
export class FilmMapper implements MapperInterface<Film, FilmDto> {
    
    public toEntity(entityDto: FilmDto): Film {
        let entity: Film = new Film();

        entity.id = uuid();
        entity.title = entityDto.title;
        entity.editor = entityDto.editor;
        entity.copies = entityDto.copies;

        return entity;
    }

    public toDto(entity: Film): FilmDto {
        let dto: FilmDto = new FilmDto();

        dto.id = entity.id;
        dto.title = entity.title;
        dto.editor = entity.editor;
        dto.copies = entity.copies;
        
        return dto;
    }
}