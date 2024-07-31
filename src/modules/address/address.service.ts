import { HttpStatus, Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import axios from 'axios';
import { createCustomError } from 'src/common/utils/helpers';
import {
  CreateAddressByCepDto,
  CreateAddressDto,
  UpdateAddressDto,
} from './dto';
import { AddressEntity } from './entities/address.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AddressService {
  constructor(private readonly repository: AddressRepository) {}

  async getAllAddresses(): Promise<AddressEntity[]> {
    try {
      const addressList = await this.repository.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return addressList;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAddressesBySessionId(sessionId: string): Promise<AddressEntity[]> {
    try {
      const addressList = await this.repository.findMany({
        where: {
          sessionId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return addressList;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAddressById(id: string): Promise<AddressEntity> {
    try {
      const address = await this.repository.findUnique({
        where: {
          id,
        },
      });

      if (!address) {
        throw createCustomError('Address not found', HttpStatus.NOT_FOUND);
      }

      return address;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createAddressByCep(
    params: CreateAddressByCepDto,
  ): Promise<AddressEntity> {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${params.cep}/json/`,
      );
      const data = response.data;

      if (!data || data.erro) {
        throw createCustomError('CEP not found', HttpStatus.NOT_FOUND);
      }

      const addressDto: CreateAddressDto = {
        street: data.logradouro,
        sessionId: params.sessionId,
        postalCode: data.cep,
        city: data.localidade,
        state: data.uf,
        country: 'Brazil',
      };

      const address = await this.repository.createAddress({
        data: addressDto,
      });

      return address;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw createCustomError(
            'Address with this session ID and postal code already exists',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createAddress(data: CreateAddressDto): Promise<AddressEntity> {
    try {
      const address = await this.repository.createAddress({
        data,
      });
      return address;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw createCustomError(
            'Address with this session ID and postal code already exists',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateAddress(
    id: string,
    data: UpdateAddressDto,
  ): Promise<AddressEntity> {
    try {
      const updateAddress = await this.repository.updateAddress({
        where: {
          id,
        },
        data,
      });
      return updateAddress;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2025':
            throw createCustomError('Address not found', HttpStatus.NOT_FOUND);
          case 'P2002':
            throw createCustomError(
              'Address with this session ID and postal code already exists',
              HttpStatus.CONFLICT,
            );
          default:
            throw createCustomError(
              e.message || 'Something went wrong',
              HttpStatus.BAD_REQUEST,
            );
        }
      }
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteAddress(id: string): Promise<AddressEntity> {
    try {
      const deleteAddress = await this.repository.deleteAddress({
        where: {
          id,
        },
      });
      return deleteAddress;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw createCustomError('Address not found', HttpStatus.NOT_FOUND);
      }
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
