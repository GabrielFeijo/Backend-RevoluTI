import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressEntity } from './entities/address.entity';
import {
  CreateAddressByCepDto,
  CreateAddressDto,
  UpdateAddressDto,
} from './dto';

@ApiTags('Address')
@Controller('')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('list-adresses')
  @ApiOperation({
    summary: 'List all addresses',
    description: 'Endpoint to retrieve a list of all addresses.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all addresses.',
    type: AddressEntity,
    isArray: true,
  })
  async getAllAddresses(): Promise<AddressEntity[]> {
    return await this.addressService.getAllAddresses();
  }

  @Get('/find-address/:id')
  @ApiOperation({
    summary: 'Find address by ID',
    description: 'Endpoint to retrieve an address by ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Address successfully retrieved.',
    type: AddressEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Address not found.',
  })
  async findAddressById(@Param('id') id: string) {
    return await this.addressService.getAddressById(id);
  }

  @Post('/create-address')
  @ApiOperation({
    summary: 'Create a new address',
    description: 'Endpoint to create a new address with provided details.',
  })
  @ApiResponse({
    status: 201,
    description: 'Address successfully created.',
    type: AddressEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request body.',
  })
  @ApiBody({
    type: CreateAddressDto,
    description: 'JSON structure containing data for creating a new address.',
  })
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    return await this.addressService.createAddress(createAddressDto);
  }

  @Post('/create-address-by-cep')
  @ApiOperation({
    summary: 'Create a new address by CEP',
    description:
      'Creates a new address using the provided CEP by fetching address details from an external service.',
  })
  @ApiBody({
    type: CreateAddressByCepDto,
    description: 'Request body containing the CEP to create an address.',
  })
  @ApiResponse({
    status: 201,
    description: 'Address successfully created.',
    type: AddressEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request body or CEP format.',
  })
  @ApiResponse({
    status: 404,
    description: 'CEP not found.',
  })
  async createAddressByCep(
    @Body() createAddressByCepDto: CreateAddressByCepDto,
  ): Promise<AddressEntity> {
    return await this.addressService.createAddressByCep(createAddressByCepDto);
  }

  @Patch('/update-address/:id')
  @ApiOperation({
    summary: 'Update an address',
    description: 'Endpoint to update an address with provided ID.',
  })
  @ApiResponse({
    status: 200,
    type: AddressEntity,
    description: 'Address successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Address not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request body.',
  })
  @ApiBody({
    type: UpdateAddressDto,
    description: 'JSON structure containing data for updating an address.',
  })
  async updateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return await this.addressService.updateAddress(id, updateAddressDto);
  }

  @Delete('/delete-address/:id')
  @ApiOperation({
    summary: 'Delete an address',
    description: 'Endpoint to delete an address with provided ID.',
  })
  @ApiResponse({
    status: 200,
    type: AddressEntity,
    description: 'Address successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Address not found.',
  })
  async deleteAddress(@Param('id') id: string) {
    return await this.addressService.deleteAddress(id);
  }
}
