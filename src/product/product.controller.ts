import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UploadedFiles,
    UseFilters,
    // eslint-disable-next-line prettier/prettier
    UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser, Public } from '../common/decorators';
import { DetailsDto, ProductDto, ProductUpdateDto, ReviewDto } from './dto';
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
        @Body() dto: ProductDto,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<Product> {
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

    @Post('/:id')
    @HttpCode(HttpStatus.OK)
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(FilesInterceptor('images', 4, imageUploadOptions))
    update(
        @Param('id') id: string | number,
        @Body() dto: ProductUpdateDto,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<Product> {
        return this.productService.update(id, dto, images);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: string | number): Promise<Product> {
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
    addDetails(@Param('id') id: string | number, @Body() dto: DetailsDto): Promise<string> {
        return this.productService.addDetails(id, dto);
    }

    @Delete('/:id/details/:detailsId')
    @HttpCode(HttpStatus.OK)
    deleteDetails(
        @Param('id') id: string | number,
        @Param('detailsId') detailsId: string | number
    ): Promise<string> {
        return this.productService.deleteDetails(id, detailsId);
    }
}
