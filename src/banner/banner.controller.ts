import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UnauthorizedException,
    UploadedFiles,
    UseFilters,
    // eslint-disable-next-line prettier/prettier
    UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    // eslint-disable-next-line prettier/prettier
    ApiTags
} from '@nestjs/swagger';
import { GetCurrentUser, Public } from '../common/decorators';
import { HttpExceptionFilter, imageUploadOptions } from '../utils';
import { BannerService } from './banner.service';
import { Banner } from './schema';

@ApiTags('Banner')
@Controller('banner')
export class BannerController {
    constructor(private bannerService: BannerService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Add banners' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        required: true,
        schema: {
            type: 'object',
            properties: {
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @ApiCreatedResponse({ type: Banner })
    @ApiBearerAuth()
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(FilesInterceptor('images', 4, imageUploadOptions))
    create(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<Banner> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.bannerService.create(images);
    }

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get banners' })
    @ApiOkResponse({ type: [Banner] })
    findAll(): Promise<Banner[]> {
        return this.bannerService.findAll();
    }

    @Delete('/:bannerId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'bannerId', type: 'string' })
    @ApiOperation({ summary: 'Delete a banner' })
    @ApiOkResponse({ type: Banner })
    @ApiBearerAuth()
    delete(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('bannerId') bannerId: string | number
    ): Promise<Banner> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.bannerService.delete(bannerId);
    }
}
