import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/schema';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({ type: [User] })
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get a user' })
    @ApiOkResponse({ type: User })
    findOne(@Param('userId') userId: string | number): Promise<User> {
        return this.userService.findOne(userId);
    }
}
