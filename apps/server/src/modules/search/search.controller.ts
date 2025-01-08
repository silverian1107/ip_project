import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { CommonQuery } from 'src/shared/dto/common.query';
import { PaginationQuery } from 'src/common/dto/pagination-query.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search for persons and dramas' })
  async search(
    @Query() query: CommonQuery,
    @Query() pagination: PaginationQuery,
  ) {
    return await this.searchService.search(query, pagination);
  }
}
