import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
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
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
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
    @ApiCreatedResponse({ type: Banner })
    @ApiBearerAuth()
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(FilesInterceptor('images', 4, imageUploadOptions))
    create(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<Banner> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.bannerService.create(images);
    }

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get banners' })
    @ApiOkResponse({ type: [Banner], isArray: true })
    findAll(): Promise<Banner[]> {
        return this.bannerService.findAll();
    }
}
