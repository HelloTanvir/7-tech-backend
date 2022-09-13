import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    // eslint-disable-next-line prettier/prettier
    UnauthorizedException
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/schema';
import { GetCurrentUser } from '../common/decorators';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({ type: [User] })
    @ApiBearerAuth()
    findAll(@GetCurrentUser('isAdmin') isAdmin: boolean): Promise<User[]> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.userService.findAll();
    }

    @Get('/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get a user' })
    @ApiOkResponse({ type: User })
    @ApiBearerAuth()
    findOne(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('userId') userId: string | number
    ): Promise<User> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.userService.findOne(userId);
    }

    @Delete('/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a user' })
    @ApiOkResponse({ type: User })
    @ApiBearerAuth()
    delete(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('userId') userId: string | number
    ): Promise<User> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.userService.delete(userId);
    }
}
