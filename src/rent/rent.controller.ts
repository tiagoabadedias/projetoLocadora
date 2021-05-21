import { Controller, Body, UseGuards, Post, Req, Put } from '@nestjs/common';
import { AbstractController } from '../shared/abstract/abstract.controller';
import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { RentService } from './rent.service';
import { AuthGuard } from '@nestjs/passport';
import { RentDto } from './dto/rent.dto';
import { RentResponseDto } from './dto/rent-response.dto';
import { Rent } from './rent.entity';


@Controller('rent')
@ApiTags('rent')
@ApiBearerAuth('token')
@UseGuards(AuthGuard())
export class RentController extends AbstractController<Rent, RentDto> {
  constructor(private readonly rentService: RentService) {
    super(rentService)
  }

  @Post()
  @ApiBody({ type: RentDto})
  @ApiOperation({ summary: 'create new rent' })
  @ApiCreatedResponse({ description: 'Successfully created.', type: RentResponseDto })
  @ApiResponse({ status: 406, description: "Not Acceptable."})
  async create(@Body() entityDto: RentDto, @Req() req): Promise<Rent> {
    return await this.rentService.createRent(entityDto, req.user.UserId);
  }

  @Put("/return")
  @ApiBody({ type: RentDto})
  @ApiOperation({ summary: 'updates rent to returned' })
  @ApiCreatedResponse({ description: 'Updated successfully.', type: RentResponseDto })
  async update(@Body() entityDto: RentDto, @Req() req): Promise<Rent> {
    return await this.rentService.updateRentReturn(req.user.UserId, entityDto.FilmId);
  }
}


 