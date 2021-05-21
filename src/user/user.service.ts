import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { AbstractService } from '../shared/abstract/abstract.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserMapper } from './dto/user.mapper';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService extends AbstractService<User, UserDto>{
  constructor(
    @Inject('USER_REPOSITORY') protected readonly userRepository: typeof User,
    protected mapper: UserMapper
  ) {
    super(userRepository, mapper)
  }
     
  async singUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const {email, password} = authCredentialsDto;

    const user = new User();
    user.email = email;
    user.password = password; 

    return await user.save();
  }

  async findOneByUsernamePassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const {email, password} = authCredentialsDto;

    let user = await User.findOne<User>({
      where: {email, password }
    });

    return user;
  }

  async findOneById(UserId: string): Promise<User> {

    let user = await User.findOne<User>({
      where: {id: UserId }
    });

    return user;
  }

}
