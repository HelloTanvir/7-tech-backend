import {
    Controller,
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
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '../common/decorators';
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
}
