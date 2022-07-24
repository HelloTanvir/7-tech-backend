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
import { ProductDto, ProductUpdateDto } from './dto';
import { ProductService } from './product.service';
import { Product } from './schema';
import { HttpExceptionFilter, imageUploadOptions } from './utils';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(FilesInterceptor('images', 5, imageUploadOptions))
    create(
        @Body() dto: ProductDto,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<Product> {
        return this.productService.create(dto, images);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string | number): Promise<Product> {
        return this.productService.findOne(id);
    }

    @Post('/:id')
    @HttpCode(HttpStatus.OK)
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(FilesInterceptor('images', 5, imageUploadOptions))
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
}
