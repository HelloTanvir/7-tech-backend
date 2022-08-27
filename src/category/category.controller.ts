import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    // eslint-disable-next-line prettier/prettier
    UnauthorizedException
} from '@nestjs/common';
import { GetCurrentUser, Public } from '../common/decorators';
import { CategoryService } from './category.service';
import { CategoryDto, CategoryUpdateDto, SubCategoryUpdateDto } from './dto';
import { Category } from './schema';

@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
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
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Public()
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string | number): Promise<Category> {
        return this.categoryService.findOne(id);
    }

    @Post('/:id')
    @HttpCode(HttpStatus.OK)
    update(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('id') id: string | number,
        @Body() dto: CategoryUpdateDto
    ): Promise<Category> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.categoryService.update(id, dto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('id') id: string | number
    ): Promise<Category> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.categoryService.delete(id);
    }

    @Post('/:categoryId/:subCategoryId')
    @HttpCode(HttpStatus.OK)
    updateSubCategory(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Param('categoryId') categoryId: string | number,
        @Param('subCategoryId') subCategoryId: string | number,
        @Body() dto: SubCategoryUpdateDto
    ): Promise<Category> {
        if (!isAdmin) {
            throw new UnauthorizedException('you are not the admin');
        }

        return this.categoryService.updateSubCategory(categoryId, subCategoryId, dto);
    }

    @Delete('/:categoryId/:subCategoryId')
    @HttpCode(HttpStatus.OK)
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
