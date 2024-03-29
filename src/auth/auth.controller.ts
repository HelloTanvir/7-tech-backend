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
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    // eslint-disable-next-line prettier/prettier
    ApiTags
} from '@nestjs/swagger';
import { GetCurrentUser, Public } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto, SignUpDto } from './dto';
import { User } from './schema';
import { Tokens, TokensForDoc } from './types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create account' })
    @ApiCreatedResponse({ type: TokensForDoc })
    signUp(@Body() dto: SignUpDto): Promise<Tokens> {
        return this.authService.signUp(dto);
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login to account' })
    @ApiCreatedResponse({ type: TokensForDoc })
    login(@Body() dto: LoginDto): Promise<Tokens> {
        return this.authService.login(dto);
    }

    @Delete('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Logout from account' })
    @ApiOkResponse({ type: String })
    @ApiBearerAuth()
    logout(@GetCurrentUser('userId') userId: number | string): Promise<string> {
        return this.authService.logout(userId);
    }

    @Get('get-me')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get logged in user' })
    @ApiOkResponse({ type: User })
    @ApiBearerAuth()
    getMe(@GetCurrentUser('userId') userId: number | string): Promise<User> {
        return this.authService.getMe(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh auth tokens' })
    @ApiOkResponse({ type: TokensForDoc })
    @ApiBearerAuth()
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
    @ApiOperation({ summary: 'Get link to reset password' })
    @ApiOkResponse({ type: String })
    forgetPassword(@Body() dto: ForgotPasswordDto): Promise<string> {
        return this.authService.forgotPassword(dto);
    }

    // reset password
    @Public()
    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Reset password' })
    @ApiOkResponse({ type: String })
    resetPassword(@Body() dto: ResetPasswordDto): Promise<string> {
        return this.authService.resetPassword(dto);
    }
}
