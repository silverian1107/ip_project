import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { SortEnum } from '../enums';
import { IsDate } from 'src/common/decorators/is_date.decorator';

export class CommonQuery {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsDate()
  fromDate?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsDate()
  toDate?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    enum: SortEnum,
    description: SortEnum.DESC + '|' + SortEnum.ASC,
  })
  @IsOptional()
  @IsEnum(SortEnum)
  sort?: SortEnum = SortEnum.DESC;
}
