import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateBillDto {
  @ApiProperty({ description: 'The total amount of the bill', example: 1000 })
  @IsNumber()
  @IsOptional()
  amount: number;

  @ApiProperty({ description: 'The tip percentage', example: 0.15 })
  @IsNumber()
  @IsOptional()
  tipPercent: number;

  @ApiProperty({ description: 'The currency ID', example: 1 })
  @IsNumber()
  currencyId: number;

  @ApiProperty({ description: 'The associated dish ID. Provide only amount or dishId, not both.', example: null, required: false })
  @IsNumber()
  @IsOptional()
  dishId?: number;
}
