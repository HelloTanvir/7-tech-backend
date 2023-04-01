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
import { CreateContentDto, UpdateAboutDto, UpdatePrivacyDto, UpdateTermsDto } from './dto';
import { Content } from './schema';

/*
    TODO: refactor all endpoints
    all of the content types should be different endpoints
    /content/terms - GET
    /content/terms - POST
    /content/terms/:termsId - DELETE
    /content/terms/:termsId - PUT

    /content/privacy - GET
    /content/privacy - POST
    /content/privacy/:privacyId - DELETE
    /content/privacy/:privacyId - PUT
    
    /content/about - GET
    /content/about - POST
    /content/about/:aboutId - DELETE
    /content/about/:aboutId - PUT
*/

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

    @Post('/update/privacy')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update privacy' })
    @ApiOkResponse({ type: Content['privacy'] })
    @ApiBearerAuth()
    updatePrivacy(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Body() updatePrivacyDto: UpdatePrivacyDto
    ): Promise<Content['privacy']> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.updatePrivacy(updatePrivacyDto);
    }

    @Post('/update/about')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update about' })
    @ApiOkResponse({ type: Content['about'] })
    @ApiBearerAuth()
    updateAbout(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Body() updateAboutDto: UpdateAboutDto
    ): Promise<Content['about']> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.updateAbout(updateAboutDto);
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
