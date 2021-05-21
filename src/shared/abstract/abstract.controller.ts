import {  Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { ServiceInterface } from '../interface/service.interface';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiResponse({ status: 401, description: "Unauthorized."})
@ApiResponse({ status: 400, description: "Not Found."})
@ApiResponse({ status: 500, description: "Internal Server error, let's review it here :)."})
export abstract class AbstractController<T, U> {
    constructor(protected readonly service: ServiceInterface<T, U>) {
     }

    @Get()
    @UseGuards(AuthGuard())
    @ApiOperation({ summary: 'search all records' })
    @ApiResponse({ status: 200, description: "Ok."})
    async findAll(): Promise<T[]> {
        return await this.service.findAll();
    }

    @Get(":id")
    @UseGuards(AuthGuard())
    @ApiOperation({ summary: 'search record by id' })
    @ApiResponse({ status: 200, description: "Ok."})
    async findOneById(@Param('id') id: string): Promise<T>  {
        const entity = await this.service.findOneById(id)

        if (!entity) {
            throw new NotFoundException()
        }

        return entity
    }
}
