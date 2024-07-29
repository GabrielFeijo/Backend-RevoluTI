import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsPostalCode, IsUUID } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Session ID',
    example: 'bb60cad4-0240-46ce-8b3d-119877b64eff',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty({ message: 'sessionId is required' })
  readonly sessionId: string;

  @ApiProperty({
    description: 'Street address',
    example: '123 Main St',
    required: true,
  })
  @IsNotEmpty({ message: 'street is required' })
  @IsString()
  readonly street: string;

  @ApiProperty({
    description: 'Postal code',
    example: '12345-678',
    required: true,
  })
  @IsNotEmpty({ message: 'postalCode is required' })
  @IsPostalCode('BR', { message: 'Invalid postal code format' })
  readonly postalCode: string;

  @ApiProperty({
    description: 'City where the address is located',
    example: 'Springfield',
    required: true,
  })
  @IsNotEmpty({ message: 'city is required' })
  @IsString()
  readonly city: string;

  @ApiProperty({
    description: 'State or region where the address is located',
    example: 'IL',
    required: true,
  })
  @IsNotEmpty({ message: 'state is required' })
  @IsString()
  readonly state: string;

  @ApiProperty({
    description: 'Country where the address is located',
    example: 'USA',
    required: true,
  })
  @IsNotEmpty({ message: 'country is required' })
  @IsString()
  readonly country: string;
}
