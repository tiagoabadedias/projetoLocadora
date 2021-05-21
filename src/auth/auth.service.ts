import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Auth } from './auth.entity';
import uuid = require('uuid');
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor (private jwtService: JwtService) {
    }

    async validateUser(email: string, pass: string): Promise<any> {
        
        let user: any = await User.findOne<User>({
            attributes: ["id", "email"],
            where: {email: email }
        });

        user = user.get({plain: true});
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {

        let user = await User.findOne<User>({ 
            attributes: ["id", "email", "password"], 
            where: { email: authCredentialsDto.email } 
        });

        let userPlain: any = user.get({plain:true});


        if (!user) {
            throw new UnauthorizedException();
        } else {

            if (await bcrypt.compare(authCredentialsDto.password, userPlain.password)) {
                return await this.createAuth(user);
            }

            throw new UnauthorizedException();
        }
    }

    async signOut(authDto: AuthDto) {
        return await Auth.update( { isExpired: true }, { where: { UserId: authDto.UserId }} ).then(async () => { return true });
    }

    async createAuth(user: User) {
        
        let auth: Auth = new Auth();
        auth.id = uuid();

        let payload = user.get({plain: true});
        payload["AuthId"] = auth.id;
        const accessToken = await this.jwtService.sign(payload);

        auth.UserId = user.id;
        auth.token = accessToken;
        auth.isExpired = false;
        auth.save();
        
        return { accessToken };
    }
}
