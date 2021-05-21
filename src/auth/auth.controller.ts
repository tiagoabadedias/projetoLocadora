import { ApiBody, ApiTags, ApiBearerAuth, ApiResponse, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthResponseTokenDto } from './dto/auth-response-token.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({ status: 401, description: "Unauthorized."})
@ApiResponse({ status: 500, description: "Internal Server error, let's review it here :)."})
export class AuthController  {

    constructor (private readonly authService: AuthService) {
    }

    @Post('/signout')
    @UseGuards(AuthGuard())
    @ApiBearerAuth('token')
    @ApiOperation({ summary: 'revoke user authentication' })
    @ApiResponse({ status: 201, description: 'Revoked authentication.'})
    signOut(@Req() req) {
        return this.authService.signOut(req.user);
    }

    @Post('/signin')
    @ApiOperation({ summary: 'authenticate user' })
    @ApiCreatedResponse({ description: 'Authentication succeeded.', type: AuthResponseTokenDto })
    @ApiBody({ type: AuthCredentialsDto })
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}
