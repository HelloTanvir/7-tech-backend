import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from '../common/decorators';
import { CategoryService } from './category.service';
import { CategoryDto, CategoryUpdateDto } from './dto';
import { Category } from './schema';

@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CategoryDto): Promise<Category> {
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
    update(@Param('id') id: string | number, @Body() dto: CategoryUpdateDto): Promise<Category> {
        return this.categoryService.update(id, dto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: string | number): Promise<Category> {
        return this.categoryService.delete(id);
    }
}
