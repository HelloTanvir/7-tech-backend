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
    // eslint-disable-next-line prettier/prettier
    UnauthorizedException
} from '@nestjs/common';
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
import { CategoryService } from './category.service';
import { CategoryDto, CategoryUpdateDto, SubCategoryDto } from './dto';
import { Category } from './schema';
import { AllCategoriesResponse } from './types';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a category' })
    @ApiCreatedResponse({ type: Category })
    @ApiBearerAuth()
    create(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Body() dto: CategoryDto
    ): Promise<Category> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.categoryService.create(dto);
    }

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
    @ApiQuery({ name: 'size', example: 15, type: Number, required: false })
    @ApiQuery({ name: 'searchQuery', example: 'searching is a costly operation', required: false })
    @ApiOperation({ summary: 'Get all categories' })
    @ApiOkResponse({ type: AllCategoriesResponse })
    findAll(
        @Query('page', new DefaultValuePipe(1), new ParseIntPipe()) page: number,
        @Query('size', new DefaultValuePipe(15), new ParseIntPipe()) size: number,
        @Query('searchQuery') searchQuery: string
    ): Promise<AllCategoriesResponse> {
        return this.categoryService.findAll(page, size, searchQuery);
    }

    @Public()
    @Get('/:categoryId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'categoryId', type: 'string' })
    @ApiOperation({ summary: 'Get a single category' })
    @ApiOkResponse({ type: Category })
    findOne(@Param('categoryId') categoryId: string | number): Promise<Category> {
        return this.categoryService.findOne(categoryId);
    }

    @Put('/:categoryId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'categoryId', type: 'string' })
    @ApiOperation({ summary: 'Update a category' })
    @ApiOkResponse({ type: Category })
    @ApiBearerAuth()
    update(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('categoryId') categoryId: string | number,
        @Body() dto: CategoryUpdateDto
    ): Promise<Category> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.categoryService.update(categoryId, dto);
    }

    @Delete('/:categoryId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'categoryId', type: 'string' })
    @ApiOperation({ summary: 'Delete a category' })
    @ApiOkResponse({ type: Category })
    @ApiBearerAuth()
    delete(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('categoryId') categoryId: string | number
    ): Promise<Category> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.categoryService.delete(categoryId);
    }

    @Post('/:categoryId/sub-category')
    @HttpCode(HttpStatus.CREATED)
    @ApiParam({ name: 'categoryId', type: 'string' })
    @ApiOperation({ summary: 'Create a sub-category' })
    @ApiCreatedResponse({ type: Category })
    @ApiBearerAuth()
    addSubCategory(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('categoryId') categoryId: string | number,
        @Body() dto: SubCategoryDto
    ): Promise<Category> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.categoryService.addSubCategory(categoryId, dto);
    }

    @Put('/:categoryId/sub-category/:subCategoryId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'categoryId', type: 'string' })
    @ApiParam({ name: 'subCategoryId', type: 'string' })
    @ApiOperation({ summary: 'Update a sub-category' })
    @ApiOkResponse({ type: Category })
    @ApiBearerAuth()
    updateSubCategory(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('categoryId') categoryId: string | number,
        @Param('subCategoryId') subCategoryId: string | number,
        @Body() dto: SubCategoryDto
    ): Promise<Category> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.categoryService.updateSubCategory(categoryId, subCategoryId, dto);
    }

    @Delete('/:categoryId/sub-category/:subCategoryId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'categoryId', type: 'string' })
    @ApiParam({ name: 'subCategoryId', type: 'string' })
    @ApiOperation({ summary: 'Delete a sub-category' })
    @ApiOkResponse({ type: Category })
    @ApiBearerAuth()
    deleteSubCategory(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('categoryId') categoryId: string | number,
        @Param('subCategoryId') subCategoryId: string | number
    ): Promise<Category> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.categoryService.deleteSubCategory(categoryId, subCategoryId);
    }
}
