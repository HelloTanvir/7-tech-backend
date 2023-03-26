import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    // eslint-disable-next-line prettier/prettier
    UnauthorizedException
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    // eslint-disable-next-line prettier/prettier
    ApiTags
} from '@nestjs/swagger';
import { GetCurrentUser, Public } from '../common/decorators';
import { ContentService } from './content.service';
import { CreateContentDto, UpdateTermsDto } from './dto';
import { Content } from './schema';

@ApiTags('Content')
@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a content' })
    @ApiCreatedResponse({ type: Content })
    @ApiBearerAuth()
    create(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Body() createContentDto: CreateContentDto
    ): Promise<Content> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.create(createContentDto);
    }

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiQuery({
        name: 'content-type',
        example: 'terms',
        required: false,
        enum: ['terms', 'privacy', 'about'],
    })
    @ApiOperation({ summary: 'Get content' })
    @ApiOkResponse({ type: Content })
    find(@Query('content-type') contentType: string): Promise<Content> {
        return this.contentService.find(contentType);
    }

    @Post('/update/terms')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update terms' })
    @ApiOkResponse({ type: Content['terms'] })
    @ApiBearerAuth()
    updateTerms(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Body() updateTermsDto: UpdateTermsDto
    ): Promise<Content['terms']> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.updateTerms(updateTermsDto);
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Remove content' })
    @ApiOkResponse({ type: String })
    @ApiBearerAuth()
    remove(@GetCurrentUser('isAdmin') isAdmin: boolean): Promise<string> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.remove();
    }
}
