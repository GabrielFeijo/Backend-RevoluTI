import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Address, Prisma } from '@prisma/client';

@Injectable()
export class AddressRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    where?: Prisma.AddressWhereInput;
  }): Promise<Address[]> {
    try {
      return await this.prisma.address.findMany(params);
    } catch (error) {
      throw error;
    }
  }

  async findUnique(params: {
    where: Prisma.AddressWhereUniqueInput;
  }): Promise<Address> {
    try {
      const { where } = params;
      return await this.prisma.address.findUnique({ where });
    } catch (error) {
      throw error;
    }
  }

  async createAddress(params: {
    data: Prisma.AddressCreateInput;
  }): Promise<Address> {
    try {
      const { data } = params;
      return await this.prisma.address.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(params: {
    where: Prisma.AddressWhereUniqueInput;
    data: Prisma.AddressUpdateInput;
  }): Promise<Address> {
    try {
      const { where, data } = params;
      return await this.prisma.address.update({ where, data });
    } catch (error) {
      throw error;
    }
  }

  async deleteAddress(params: {
    where: Prisma.AddressWhereUniqueInput;
  }): Promise<Address> {
    try {
      const { where } = params;
      return await this.prisma.address.delete({ where });
    } catch (error) {
      throw error;
    }
  }
}
