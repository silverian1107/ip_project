import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  dramaId: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  rating: number;

  @ApiProperty({ type: String, required: true, example: 'This is a review' })
  @IsString()
  content: string;
}
