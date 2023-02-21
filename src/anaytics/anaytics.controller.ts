import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators';
import { AnayticsService } from './anaytics.service';
import { AllAnalyticsResponse } from './types';

@ApiTags('Analytics')
@Controller('anaytics')
export class AnayticsController {
    constructor(private anayticsService: AnayticsService) {}

    @Public()
    @Get()
    @ApiOperation({ summary: 'Gel all categories' })
    @ApiOkResponse({ type: AllAnalyticsResponse })
    findAll(): Promise<AllAnalyticsResponse> {
        return this.anayticsService.findAll();
    }
}
