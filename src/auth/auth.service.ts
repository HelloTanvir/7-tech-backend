import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto, SignUpDto } from './dto';
import { User, UserDocument } from './schema';
import { Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(
        private config: ConfigService,
        private jwtService: JwtService,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {}

    async signUp(dto: SignUpDto): Promise<Tokens> {
        // check if the user exists with the provided email
        const user = await this.userModel.findOne({ email: dto.email });

        if (user) {
            throw new ForbiddenException('user already exists');
        }

        // create user
        const newUser = await this.userModel.create(dto);

        const tokens = await this.getTokens(newUser._id.toString());

        // update refresh token in db
        await this.updateRefreshToken(newUser._id.toString(), tokens.refresh_token);

        return tokens;
    }

    async login(dto: LoginDto): Promise<Tokens> {
        // find the user with email
        const user = await this.userModel.findOne({ email: dto.email });

        if (!user) {
            throw new ForbiddenException('invalid email or password');
        }

        // compare user password
        const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordMatch) {
            throw new ForbiddenException('invalid email or password');
        }

        const tokens = await this.getTokens(user._id.toString());

        // update refresh token in db
        await this.updateRefreshToken(user._id.toString(), tokens.refresh_token);

        return tokens;
    }

    async logout(userId: number | string): Promise<string> {
        // update refresh token to null in db
        await this.updateRefreshToken(userId, null);

        return 'logged out';
    }

    async getMe(userId: number | string): Promise<User> {
        return await this.userModel.findById(userId, { password: 0, refreshToken: 0 });
    }

    async refreshTokens(userId: number | string, enteredRt: string): Promise<Tokens> {
        // find user with userId from db
        const user = await this.userModel.findById(userId);

        if (!user || !user.refreshToken) {
            throw new ForbiddenException('invalid refresh token');
        }

        // compare refresh token
        const isRtMatch = await bcrypt.compare(enteredRt, user.refreshToken);

        if (!isRtMatch) {
            throw new ForbiddenException('invalid refresh token');
        }

        const tokens = await this.getTokens(user._id.toString());

        // update refresh token in db
        await this.updateRefreshToken(user._id.toString(), tokens.refresh_token);

        return tokens;
    }

    private async updateRefreshToken(userId: number | string, rt: string | null): Promise<void> {
        if (rt) {
            const salt = await bcrypt.genSalt(10);
            rt = await bcrypt.hash(rt, salt);
        }

        await this.userModel.findByIdAndUpdate(userId, { refreshToken: rt });
    }

    private async getTokens(userId: number | string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            // access token
            this.jwtService.signAsync(
                {
                    userId,
                },
                {
                    secret: this.config.get('AT_SECRET_KEY'),
                    expiresIn: 60 * 15, // 15 min
                }
            ),

            // refresh token
            this.jwtService.signAsync(
                {
                    userId,
                },
                {
                    secret: this.config.get('RT_SECRET_KEY'),
                    expiresIn: 60 * 60 * 24 * 7, // 1 week
                }
            ),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
        };
    }

    async forgotPassword(dto: ForgotPasswordDto): Promise<string> {
        const user = await this.userModel.findOne({ email: dto.email });

        if (!user) {
            throw new ForbiddenException('user not found');
        }

        const secret = this.config.get('FORGOT_PASSWORD_SECRET_KEY') + user.password;

        const token = await this.jwtService.signAsync(
            {
                userId: user._id.toString(),
                email: user.email,
            },
            {
                secret,
                expiresIn: 60 * 15, //15 min
            }
        );

        const link = `${this.config.get(
            'FRONTEND_URL'
        )}/reset-password/${user._id.toString()}/${token}`;

        console.log({ link });

        return 'reset password link sent to user email';
    }

    async resetPassword(dto: ResetPasswordDto): Promise<string> {
        const user = await this.userModel.findById(dto.userId);

        if (!user) {
            throw new ForbiddenException('user not found');
        }

        const secret = this.config.get('FORGOT_PASSWORD_SECRET_KEY') + user.password;

        const payload = await this.jwtService.verifyAsync(dto.token, { secret });

        const { userId: id, email } = payload as { userId: string; email: string };

        if (id !== dto.userId || email !== user.email) {
            throw new ForbiddenException('invalid token');
        }

        user.password = dto.newPassword;

        await user.save();

        return 'password updated';
    }
}
