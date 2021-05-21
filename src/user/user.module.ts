import { JwtStrategy } from '../auth/jwt-strategy';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { userProviders } from './user.providers';
import { UserMapper } from './dto/user.mapper';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: "jwt"}),
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders, UserMapper, JwtStrategy],
  exports:[UserService]
})
export class UserModule {}
