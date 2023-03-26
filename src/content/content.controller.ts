import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    // eslint-disable-next-line prettier/prettier
    UnauthorizedException
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '../common/decorators';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './schema';

@ApiTags('Content')
@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a content' })
    @ApiCreatedResponse({ type: Content })
    @ApiBearerAuth()
    create(
        @GetCurrentUser('isAdmin') isAdmin: boolean,
        @Body() createContentDto: CreateContentDto
    ): Promise<Content> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.contentService.create(createContentDto);
    }

    @Get()
    findAll() {
        return this.contentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.contentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
        return this.contentService.update(+id, updateContentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.contentService.remove(+id);
    }
}
