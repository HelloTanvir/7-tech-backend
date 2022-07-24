import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schema';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
    imports: [
        JwtModule.register({}),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [AuthService, AtStrategy, RtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
