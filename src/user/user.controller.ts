import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Put,
    Query,
    // eslint-disable-next-line prettier/prettier
    UnauthorizedException
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { User } from '../auth/schema';
import { GetCurrentUser } from '../common/decorators';
import { ProfileUpdateDto } from './dto';
import { AllUsersResponse } from './types';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
    @ApiQuery({ name: 'size', example: 15, type: Number, required: false })
    @ApiQuery({ name: 'searchQuery', example: 'searching is a costly operation', required: false })
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({ type: AllUsersResponse })
    @ApiBearerAuth()
    findAll(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Query('page', new DefaultValuePipe(1), new ParseIntPipe()) page: number,
        @Query('size', new DefaultValuePipe(15), new ParseIntPipe()) size: number,
        @Query('searchQuery') searchQuery: string
    ): Promise<AllUsersResponse> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.userService.findAll(page, size, searchQuery);
    }

    @Get('/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'userId', type: 'string' })
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

    @Put('/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'userId', type: 'string' })
    @ApiOperation({ summary: 'Update user profile' })
    @ApiOkResponse({ type: User })
    @ApiBearerAuth()
    update(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('userId') userId: string | number,
        @Body() dto: ProfileUpdateDto
    ): Promise<User> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.userService.update(userId, dto);
    }

    @Delete('/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'userId', type: 'string' })
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
