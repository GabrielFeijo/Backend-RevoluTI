import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateAddressByCepDto {
  @ApiProperty({
    description: 'CEP to create an address',
    example: '12345-678',
    required: true,
  })
  @IsNotEmpty({ message: 'CEP is required' })
  @IsString()
  @Matches(/^\d{5}-\d{3}$/, { message: 'Invalid CEP format' })
  readonly cep: string;
}
