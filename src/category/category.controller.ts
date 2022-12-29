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
    // eslint-disable-next-line prettier/prettier
    UnauthorizedException
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    // eslint-disable-next-line prettier/prettier
    ApiTags
} from '@nestjs/swagger';
import { GetCurrentUser, Public } from '../common/decorators';
import { CategoryService } from './category.service';
import { CategoryDto, CategoryUpdateDto, SubCategoryDto } from './dto';
import { Category } from './schema';

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
            throw new UnauthorizedException('you are not the admin');
        }

        return this.categoryService.create(dto);
    }

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Gel all categories' })
    @ApiOkResponse({ type: [Category] })
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Public()
    @Get('/:categoryId')
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'categoryId', type: 'string' })
    @ApiOperation({ summary: 'Gel a single category' })
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
            throw new UnauthorizedException('you are not the admin');
        }

        return this.categoryService.update(categoryId, dto);
    }

    // TODO: remove public after testing
    @Public()
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
            // throw new UnauthorizedException('you are not the admin');
            console.log('you are not the admin');
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
            throw new UnauthorizedException('you are not the admin');
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
            throw new UnauthorizedException('you are not the admin');
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
            throw new UnauthorizedException('you are not the admin');
        }

        return this.categoryService.deleteSubCategory(categoryId, subCategoryId);
    }
}
