import { DataTransferObjectInterface } from "../interface/dataTransferObject.interface";
import { ServiceInterface } from "../interface/service.interface";
import { EntityInterface } from "../interface/entity.interface";
import { MapperInterface } from "../interface/mapper.interface";
import { NotFoundException, NotAcceptableException } from "@nestjs/common";

export class AbstractService<T extends EntityInterface, U extends DataTransferObjectInterface>
  implements ServiceInterface<T, U>{

  constructor(protected repository, protected mapper: MapperInterface<T, U>) { }

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async findOneById(id: string): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } })

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async create(entityDto: U): Promise<T> {
    let entity: T = this.mapper.toEntity(entityDto)

    try {
      await entity.save();
    } catch (error) {
      throw new NotAcceptableException("Error: ", error.errors[0].message);
    }

    const entityPersisted = await this.findOneById(entity.id)

    return entityPersisted;
  }
}