import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Query,
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
import { TermsCreateDto, TermsUpdateDto } from './dto';
import { Content, Terms } from './schema';

@ApiTags('Content')
@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService) {}

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
    findTerm(@Query('termsId') termsId: string): Promise<Terms> {
        return this.contentService.findTerm(termsId);
    }

    @Put('terms/:termsId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a term' })
    @ApiOkResponse({ type: Terms })
    @ApiBearerAuth()
    updateTerm(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Query('termsId') termsId: string,
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
        @Query('termsId') termsId: string
    ): Promise<Terms> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.deleteTerm(termsId);
    }
}
