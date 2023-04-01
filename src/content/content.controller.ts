import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    // eslint-disable-next-line prettier/prettier
    UnauthorizedException
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
import { ContentService } from './content.service';
import { PrivacyCreateDto, TermsCreateDto, TermsUpdateDto } from './dto';
import { Content, Privacy, Terms } from './schema';

@ApiTags('Content')
@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService) {}

    // Terms
    @Post('terms')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a terms' })
    @ApiCreatedResponse({ type: Terms })
    @ApiBearerAuth()
    createTerms(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Body() termsCreateDto: TermsCreateDto
    ): Promise<Terms> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.createTerms(termsCreateDto);
    }

    @Public()
    @Get('terms')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all terms' })
    @ApiOkResponse({ type: Content['terms'] })
    findTerms(): Promise<Content['terms']> {
        return this.contentService.findTerms();
    }

    @Public()
    @Get('terms/:termsId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get a term' })
    @ApiOkResponse({ type: Terms })
    findTerm(@Param('termsId') termsId: string): Promise<Terms> {
        return this.contentService.findTerm(termsId);
    }

    @Put('terms/:termsId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a term' })
    @ApiOkResponse({ type: Terms })
    @ApiBearerAuth()
    updateTerm(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('termsId') termsId: string,
        @Body() termsUpdateDto: TermsUpdateDto
    ): Promise<Terms> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.updateTerm(termsId, termsUpdateDto);
    }

    @Delete('terms/:termsId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a term' })
    @ApiOkResponse({ type: Terms })
    @ApiBearerAuth()
    deleteTerm(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('termsId') termsId: string
    ): Promise<Terms> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.deleteTerm(termsId);
    }

    // Privacy
    @Post('privacy')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a privacy' })
    @ApiCreatedResponse({ type: Privacy })
    @ApiBearerAuth()
    createPrivacy(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Body() privacyCreateDto: PrivacyCreateDto
    ): Promise<Privacy> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.createPrivacy(privacyCreateDto);
    }

    @Public()
    @Get('privacy')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all privacy' })
    @ApiOkResponse({ type: Content['privacy'] })
    findPrivacies(): Promise<Content['privacy']> {
        return this.contentService.findPrivacies();
    }

    @Public()
    @Get('privacy/:privacyId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get a privacy' })
    @ApiOkResponse({ type: Privacy })
    findPrivacy(@Param('privacyId') privacyId: string): Promise<Privacy> {
        return this.contentService.findPrivacy(privacyId);
    }

    @Put('privacy/:privacyId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a privacy' })
    @ApiOkResponse({ type: Privacy })
    @ApiBearerAuth()
    updatePrivacy(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('privacyId') privacyId: string,
        @Body() privacyUpdateDto: PrivacyCreateDto
    ): Promise<Privacy> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.updatePrivacy(privacyId, privacyUpdateDto);
    }

    @Delete('privacy/:privacyId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a privacy' })
    @ApiOkResponse({ type: Privacy })
    @ApiBearerAuth()
    deletePrivacy(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('privacyId') privacyId: string
    ): Promise<Privacy> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.deletePrivacy(privacyId);
    }
}
