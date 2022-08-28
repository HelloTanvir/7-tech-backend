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
    UnauthorizedException,
    UploadedFiles,
    UseFilters,
    // eslint-disable-next-line prettier/prettier
    UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser, Public } from '../common/decorators';
import { DetailsDto, InformationDto, ProductDto, ProductUpdateDto, ReviewDto } from './dto';
import { ProductService } from './product.service';
import { Product } from './schema';
import { HttpExceptionFilter, imageUploadOptions } from './utils';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(FilesInterceptor('images', 4, imageUploadOptions))
    create(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Body() dto: ProductDto,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<Product> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.create(dto, images);
    }

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Public()
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string | number): Promise<Product> {
        return this.productService.findOne(id);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(FilesInterceptor('images', 4, imageUploadOptions))
    update(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('id') id: string | number,
        @Body() dto: ProductUpdateDto,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<Product> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.update(id, dto, images);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('id') id: string | number
    ): Promise<Product> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.delete(id);
    }

    @Post('/:id/review')
    @HttpCode(HttpStatus.CREATED)
    addReview(
        @GetCurrentUser('userId') userId: number | string,
        @Param('id') id: string | number,
        @Body() dto: ReviewDto
    ): Promise<string> {
        return this.productService.addReview(userId, id, dto);
    }

    @Delete('/:id/review/:reviewId')
    @HttpCode(HttpStatus.OK)
    deleteReview(
        @GetCurrentUser('userId') userId: number | string,
        @Param('id') id: string | number,
        @Param('reviewId') reviewId: string | number
    ): Promise<string> {
        return this.productService.deleteReview(userId, id, reviewId);
    }

    @Post('/:id/details')
    @HttpCode(HttpStatus.CREATED)
    addDetails(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('id') id: string | number,
        @Body() dto: DetailsDto
    ): Promise<string> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.addDetails(id, dto);
    }

    @Delete('/:id/details/:detailsId')
    @HttpCode(HttpStatus.OK)
    deleteDetails(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('id') id: string | number,
        @Param('detailsId') detailsId: string | number
    ): Promise<string> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.deleteDetails(id, detailsId);
    }

    @Post('/:id/information')
    @HttpCode(HttpStatus.CREATED)
    addInformation(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('id') id: string | number,
        @Body() dto: InformationDto
    ): Promise<string> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.addInformation(id, dto);
    }

    @Delete('/:id/information/:informationId')
    @HttpCode(HttpStatus.OK)
    deleteInformation(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('id') id: string | number,
        @Param('informationId') informationId: string | number
    ): Promise<string> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.deleteInformation(id, informationId);
    }
}
