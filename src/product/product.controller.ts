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
import { DetailsDto, InformationDto, ProductDto, ProductUpdateDto, ReviewDto } from './dto';
import { ProductService } from './product.service';
import { Product } from './schema';

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a product' })
    @ApiCreatedResponse({ type: Product })
    @ApiBearerAuth()
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
    @ApiOperation({ summary: 'Get all products' })
    @ApiOkResponse({ type: [Product], isArray: true })
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Public()
    @Get('/:productId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get a single product' })
    @ApiOkResponse({ type: Product })
    findOne(@Param('productId') productId: string | number): Promise<Product> {
        return this.productService.findOne(productId);
    }

    @Put('/:productId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a product' })
    @ApiOkResponse({ type: Product })
    @ApiBearerAuth()
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(FilesInterceptor('images', 4, imageUploadOptions))
    update(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('productId') productId: string | number,
        @Body() dto: ProductUpdateDto,
        @UploadedFiles() images: Array<Express.Multer.File>
    ): Promise<Product> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.update(productId, dto, images);
    }

    @Delete('/:productId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a product' })
    @ApiOkResponse({ type: Product })
    @ApiBearerAuth()
    delete(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('productId') productId: string | number
    ): Promise<Product> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.delete(productId);
    }

    @Post('/:productId/review')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Add a review' })
    @ApiCreatedResponse({ type: String })
    @ApiBearerAuth()
    addReview(
        @GetCurrentUser('userId') userId: number | string,
        @Param('productId') productId: string | number,
        @Body() dto: ReviewDto
    ): Promise<string> {
        return this.productService.addReview(userId, productId, dto);
    }

    @Delete('/:productId/review/:reviewId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a review' })
    @ApiOkResponse({ type: String })
    @ApiBearerAuth()
    deleteReview(
        @GetCurrentUser('userId') userId: number | string,
        @Param('productId') productId: string | number,
        @Param('reviewId') reviewId: string | number
    ): Promise<string> {
        return this.productService.deleteReview(userId, productId, reviewId);
    }

    @Post('/:productId/details')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Add details' })
    @ApiCreatedResponse({ type: String })
    @ApiBearerAuth()
    addDetails(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('productId') productId: string | number,
        @Body() dto: DetailsDto
    ): Promise<string> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.addDetails(productId, dto);
    }

    @Delete('/:productId/details/:detailsId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete details' })
    @ApiOkResponse({ type: String })
    @ApiBearerAuth()
    deleteDetails(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('productId') productId: string | number,
        @Param('detailsId') detailsId: string | number
    ): Promise<string> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.deleteDetails(productId, detailsId);
    }

    @Post('/:productId/information')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Add information' })
    @ApiCreatedResponse({ type: String })
    @ApiBearerAuth()
    addInformation(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('productId') productId: string | number,
        @Body() dto: InformationDto
    ): Promise<string> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.addInformation(productId, dto);
    }

    @Delete('/:productId/information/:informationId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete information' })
    @ApiOkResponse({ type: String })
    @ApiBearerAuth()
    deleteInformation(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('productId') productId: string | number,
        @Param('informationId') informationId: string | number
    ): Promise<string> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.productService.deleteInformation(productId, informationId);
    }
}
