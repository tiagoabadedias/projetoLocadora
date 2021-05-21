import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../user/user.entity';
import { Auth } from './auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'projetoTeste'})
    }

    async validate(payload: any): Promise<User> {
        
        let auth: any = await Auth.findOne({
            include: [{ model: User }],
            where: { "$user.email$" : payload.email, isExpired: false, id: payload.AuthId }
        });
        
        if (!auth) {
          throw new UnauthorizedException();
        }

        auth = auth.get({plain: true});

        return auth;
      }
}