import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrencyDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the currency',
    example: 'US Dollar',
  })
  name: string;

  @IsString()
  @ApiProperty({ description: 'The symbol of the currency', example: '$' })
  symbol: string;

  @IsNumber()
  @ApiProperty({
    description: 'The exchange rate of the currency to USD',
    example: 1,
  })
  exchangeRate: number;
}
