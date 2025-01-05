import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DramaService } from './drama.service';

@ApiTags('dramas')
@ApiBearerAuth()
@Controller('dramas')
export class DramaController {
  constructor(private readonly dramaService: DramaService) {}
}
