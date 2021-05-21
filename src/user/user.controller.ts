import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Post, ValidationPipe, Body, UnprocessableEntityException } from '@nestjs/common';
import { AbstractController } from '../shared/abstract/abstract.controller';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import * as EmailValidator from 'email-validator';

@Controller('user')
@ApiTags('user')
@UseGuards(AuthGuard())
@ApiBearerAuth('token')
export class UserController extends AbstractController<User, UserDto> {

  constructor(private readonly userService: UserService) {
    super(userService)
  }

  @Post()
  @ApiBody({ type: UserDto})
  @ApiOperation({ summary: 'create new user' })
  @ApiCreatedResponse({ description: 'Successfully created.', type: UserResponseDto })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity.' })
  @ApiResponse({ status: 406, description: 'Not Acceptable.' })
  async create(@Body(ValidationPipe) entityDto: UserDto): Promise<User> {

    if (entityDto && entityDto.email && EmailValidator.validate(entityDto.email)) {
      return await this.userService.create(entityDto);  
    } else {
      throw new UnprocessableEntityException("Invalid object format or invalid email");
    }

    
  }
}
