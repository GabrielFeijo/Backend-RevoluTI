import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class CreateAddressByCepDto {
  @ApiProperty({
    description: 'Session ID',
    example: 'bb60cad4-0240-46ce-8b3d-119877b64eff',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty({ message: 'sessionId is required' })
  readonly sessionId: string;

  @ApiProperty({
    description: 'CEP to create an address',
    example: '12345-678',
    required: true,
  })
  @IsNotEmpty({ message: 'cep is required' })
  @IsString()
  @Matches(/^\d{5}-\d{3}$/, { message: 'Invalid CEP format' })
  readonly cep: string;
}
