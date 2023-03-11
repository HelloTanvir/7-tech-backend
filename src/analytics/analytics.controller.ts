import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '../common/decorators';
import { AnalyticsService } from './analytics.service';
import { AllAnalyticsResponse } from './types';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) {}

    @Get()
    @ApiOperation({ summary: 'Get analytics for admin panel' })
    @ApiOkResponse({ type: AllAnalyticsResponse })
    @ApiBearerAuth()
    findAll(@GetCurrentUser('isAdmin') isAdmin: boolean): Promise<AllAnalyticsResponse> {
        if (!isAdmin) {
            throw new UnauthorizedException('Admin access denied');
        }

        return this.analyticsService.findAll();
    }
}
