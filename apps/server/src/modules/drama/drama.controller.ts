import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from 'src/common/dto/pagination-query.dto';
import { DramaService } from './drama.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';

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
  async getDramas(@Query() pagination: PaginationQuery) {
    return await this.dramaService.getDramas(pagination);
  }

  @Get('isLiked/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async isLiked(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return await this.dramaService.isLiked(id, user.id);
  }
}
