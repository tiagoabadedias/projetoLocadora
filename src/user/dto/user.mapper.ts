import { MapperInterface } from "src/shared/interface/mapper.interface";
import { Injectable } from "@nestjs/common";
import { User } from "../user.entity";
import { UserDto } from "./user.dto";
import uuid = require("uuid");
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserMapper implements MapperInterface<User, UserDto> {
    public  toEntity(entityDto: UserDto): User {
        let entity: User = new User()

        entity.id = uuid();
        entity.email = entityDto.email;
        entity.name = entityDto.name;
        entity.password = bcrypt.hashSync(entityDto.password, 10);

        const saltOrRounds = 10;
        const hash =  bcrypt.hash(entityDto.password, saltOrRounds).then((result) => {return result});
        Promise.resolve(hash).then(function(v) {
            entity.password = v;
        });

        return entity;
    }


    public toDto(entity: User): UserDto {
        let entityDto: UserDto = new UserDto()

        delete entityDto.password;
        entityDto.id = entity.id;
        entityDto.email = entity.email;
        entityDto.name = entity.name;

        return entityDto
    }

}