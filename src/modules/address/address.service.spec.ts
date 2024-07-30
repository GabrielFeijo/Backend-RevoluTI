import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { AddressService } from './address.service';
import { faker } from '@faker-js/faker';
import { AddressRepository } from './address.repository';

const address = {
  id: '4cd59115-6981-4610-8cba-e895a2357916',
  sessionId: faker.string.uuid(),
  street: faker.location.street(),
  postalCode: faker.location.zipCode(),
  city: faker.location.city(),
  state: faker.location.state(),
  country: faker.location.country(),
};

const updatedAddress = {
  ...address,
  street: faker.location.street(),
};

describe('AddressService - Main Flow', () => {
  let sut: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService, AddressRepository, PrismaService],
    }).compile();

    sut = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a new address and return it', async () => {
    const result = await sut.createAddress(address);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toMatchObject(address);
  });

  it('should find an address by id', async () => {
    const result = await sut.getAddressById(address.id);

    expect(result).toBeDefined();
    expect(result).toMatchObject(address);
  });

  it('should return a 404 error when address is not found', async () => {
    const nonExistentId = 'non-existent-id';
    try {
      await sut.getAddressById(nonExistentId);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('Address not found');
    }
  });

  it('should update an existing address and return it', async () => {
    const result = await sut.updateAddress(address.id, updatedAddress);

    expect(result).toBeDefined();
    expect(result).toMatchObject(updatedAddress);
  });

  it('should return a 404 error when updating an address with invalid id', async () => {
    const nonExistentId = 'non-existent-id';
    try {
      await sut.updateAddress(nonExistentId, updatedAddress);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('Address not found');
    }
  });

  it('should delete an address by id', async () => {
    const result = await sut.deleteAddress(address.id);

    expect(result).toBeDefined();
  });

  it('should return a 404 error when deleting an address that does not exist', async () => {
    const nonExistentId = 'non-existent-id';
    try {
      await sut.deleteAddress(nonExistentId);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('Address not found');
    }
  });
});
