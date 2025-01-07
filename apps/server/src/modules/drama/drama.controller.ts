import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from 'src/common/dto/pagination-query.dto';
import { DramaService } from './drama.service';

@ApiTags('dramas')
@Controller('dramas')
export class DramaController {
  constructor(private readonly dramaService: DramaService) {}

  @Get('popular')
  async getPopularDramas() {
    return await this.dramaService.getPopularDramas();
  }

  @Get('newest')
  async getNewestDramas() {
    return await this.dramaService.getNewestDramas();
  }

  @Get(':id')
  async getDrama(@Param('id') id: number) {
    return await this.dramaService.findById(id);
  }

  @Get()
  @ApiBearerAuth()
  async getDramas(@Query() pagination: PaginationQuery) {
    return await this.dramaService.getDramas(pagination);
  }
}
