import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
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
    ApiParam,
    ApiQuery,
    // eslint-disable-next-line prettier/prettier
    ApiTags
} from '@nestjs/swagger';
import { GetCurrentUser, Public } from '../common/decorators';
import { HttpExceptionFilter, imageUploadOptions } from '../utils';
import { DetailsDto, InformationDto, ProductDto, ProductUpdateDto, ReviewDto } from './dto';
import { FilterQuery } from './interfaces';
import { ProductService } from './product.service';
import { Product } from './schema';
import { AllProductsResponse, FeaturedProductsOnHome } from './types';

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
    @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
    @ApiQuery({ name: 'size', example: 15, type: Number, required: false })
    @ApiQuery({ name: 'name', example: 'Asus VivoBook S15', required: false })
    @ApiQuery({ name: 'category', example: 'Laptop', required: false })
    @ApiQuery({ name: 'subCategory', example: 'Asus', required: false })
    @ApiQuery({ name: 'startDate', example: '2022-12-24T19:09:05.925Z', required: false })
    @ApiQuery({ name: 'endDate', example: '2022-12-24T19:09:05.925Z', required: false })
    @ApiQuery({ name: 'searchQuery', example: 'searching is a costly operation', required: false })
    @ApiOperation({ summary: 'Get all products' })
    @ApiOkResponse({ type: AllProductsResponse })
    findAll(
        @Query('page', new DefaultValuePipe(1), new ParseIntPipe()) page: number,
        @Query('size', new DefaultValuePipe(15), new ParseIntPipe()) size: number,
        @Query('name') name: string,
        @Query('category') category: string,
        @Query('subCategory') subCategory: string,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('searchQuery') searchQuery: string
    ): Promise<AllProductsResponse> {
        let filterQuery: FilterQuery = {};

        if (name) {
            filterQuery = { ...filterQuery, name };
        }
        if (category) {
            filterQuery = { ...filterQuery, category };
        }
        if (subCategory) {
            filterQuery = { ...filterQuery, subCategory };
        }
        if (startDate) {
            filterQuery = {
                ...filterQuery,
                updatedAt: { ...filterQuery.updatedAt, $gte: startDate },
            };
        }
        if (endDate) {
            filterQuery = {
                ...filterQuery,
                updatedAt: { ...filterQuery.updatedAt, $lte: endDate },
            };
        }

        return this.productService.findAll(page, size, searchQuery, filterQuery);
    }

    @Public()
    @Get('/featured-on-home')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all featured products for homepage' })
    @ApiOkResponse({ type: [FeaturedProductsOnHome] })
    findFeaturedOnHome(): Promise<FeaturedProductsOnHome[]> {
        return this.productService.findFeaturedOnHome();
    }

    @Public()
    @Get('/:productId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'productId', type: 'string' })
    @ApiOperation({ summary: 'Get a single product' })
    @ApiOkResponse({ type: Product })
    findOne(@Param('productId') productId: string | number): Promise<Product> {
        return this.productService.findOne(productId);
    }

    @Put('/:productId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'productId', type: 'string' })
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
    @ApiParam({ name: 'productId', type: 'string' })
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
    @ApiParam({ name: 'productId', type: 'string' })
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
    @ApiParam({ name: 'productId', type: 'string' })
    @ApiParam({ name: 'reviewId', type: 'string' })
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
    @ApiParam({ name: 'productId', type: 'string' })
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
    @ApiParam({ name: 'productId', type: 'string' })
    @ApiParam({ name: 'detailsId', type: 'string' })
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
    @ApiParam({ name: 'productId', type: 'string' })
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
    @ApiParam({ name: 'productId', type: 'string' })
    @ApiParam({ name: 'informationId', type: 'string' })
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
