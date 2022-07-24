import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    // eslint-disable-next-line prettier/prettier
    UseGuards
} from '@nestjs/common';
import { GetCurrentUser, Public } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto, SignUpDto } from './dto';
import { User } from './schema';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() dto: SignUpDto): Promise<Tokens> {
        return this.authService.signUp(dto);
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDto): Promise<Tokens> {
        return this.authService.login(dto);
    }

    @Delete('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUser('userId') userId: number | string): Promise<string> {
        return this.authService.logout(userId);
    }

    @Get('get-me')
    @HttpCode(HttpStatus.OK)
    getMe(@GetCurrentUser('userId') userId: number | string): Promise<User> {
        return this.authService.getMe(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    refreshToken(
        @GetCurrentUser('userId') userId: number | string,
        @GetCurrentUser('refreshToken') refreshToken: string
    ): Promise<Tokens> {
        return this.authService.refreshTokens(userId, refreshToken);
    }

    // forgot password
    @Public()
    @Post('forget-password')
    @HttpCode(HttpStatus.OK)
    forgetPassword(@Body() dto: ForgotPasswordDto): Promise<string> {
        return this.authService.forgotPassword(dto);
    }

    // reset password
    @Public()
    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    resetPassword(@Body() dto: ResetPasswordDto): Promise<string> {
        return this.authService.resetPassword(dto);
    }
}
