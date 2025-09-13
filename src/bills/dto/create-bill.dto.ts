import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateBillDto {
  @ApiProperty({ description: 'The total amount of the bill', example: 1000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'The tip percentage', example: 0.15 })
  @IsNumber()
  @IsOptional()
  tipPercent: number;

  @ApiProperty({ description: 'Custom tip amount', example: null })
  @IsNumber()
  @IsOptional()
  tipAmount: number;
}
