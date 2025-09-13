import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the bill this participant is associated with',
    example: 1,
  })
  billId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The name of the participant',
    example: 'John Doe',
    required: false,
  })
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description:
      'Custom percentage of the bill for this participant (Provide either customPercent or customAmount)',
    example: 0.25,
    required: false,
  })
  customPercent?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description:
      'Custom amount of the bill for this participant (Provide either customPercent or customAmount)',
    example: null,
    required: false,
  })
  customAmount?: number;
}
