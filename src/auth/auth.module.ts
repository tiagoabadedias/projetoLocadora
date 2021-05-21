import { DatabaseModule } from '../shared/database/database.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({
      secret:'projetoTeste',
      signOptions:{
        expiresIn: 86400
      }
    }),
    DatabaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[JwtStrategy, PassportModule]
})
export class AuthModule { }
