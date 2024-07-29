import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@prisma/client';

export class AddressEntity implements Address {
  @ApiProperty({
    type: String,
    description: 'Unique identifier for the Address',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
  })
  id: string;

  @ApiProperty({
    description: 'Session ID',
    example: 'bb60cad4-0240-46ce-8b3d-119877b64eff',
    required: true,
  })
  sessionId: string;

  @ApiProperty({
    type: String,
    description: 'Street address',
    example: '123 Main St',
  })
  street: string;

  @ApiProperty({
    type: String,
    description: 'Postal code',
    example: '12345-678',
  })
  postalCode: string;

  @ApiProperty({
    type: String,
    description: 'City where the address is located',
    example: 'Springfield',
  })
  city: string;

  @ApiProperty({
    type: String,
    description: 'State or region where the address is located',
    example: 'IL',
  })
  state: string;

  @ApiProperty({
    type: String,
    description: 'Country where the address is located',
    example: 'USA',
  })
  country: string;

  @ApiProperty({
    type: String,
    description: 'Timestamp when the address was created',
    example: '2024-07-29T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    description: 'Timestamp when the address was last updated',
    example: '2024-07-29T12:34:56.789Z',
  })
  updatedAt: Date;
}
