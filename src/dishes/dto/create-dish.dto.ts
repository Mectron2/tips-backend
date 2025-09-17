import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDishDto {
  @IsString()
  @ApiProperty({ description: 'The name of the dish', example: 'Pasta' })
  name: string;

  @IsNumber()
  @ApiProperty({ description: 'The price of the dish', example: 12.99 })
  price: number;
}
