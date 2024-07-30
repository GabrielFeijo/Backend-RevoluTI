import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';

import { faker } from '@faker-js/faker';
import { PrismaService } from '../../database/prisma.service';
import { AddressRepository } from './address.repository';
import { INestApplication } from '@nestjs/common';

const fakeAddresses = [
  {
    id: faker.string.uuid(),
    sessionId: faker.string.uuid(),
    street: faker.location.street(),
    postalCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  },
  {
    id: faker.string.uuid(),
    sessionId: faker.string.uuid(),
    street: faker.location.street(),
    postalCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  },
  {
    id: faker.string.uuid(),
    sessionId: faker.string.uuid(),
    street: faker.location.street(),
    postalCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  },
];

const prismaMock = {
  address: {
    create: jest.fn().mockReturnValue(fakeAddresses[0]),
    findMany: jest.fn().mockResolvedValue(fakeAddresses),
    findUnique: jest.fn().mockResolvedValue(fakeAddresses[0]),
    update: jest.fn().mockResolvedValue(fakeAddresses[0]),
    delete: jest.fn(),
  },
};

describe('AddressService', () => {
  let app: INestApplication;
  let service: AddressService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        AddressRepository,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<AddressService>(AddressService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of addresses`, async () => {
      const response = await service.getAllAddresses();

      expect(response).toEqual(fakeAddresses);
    });
  });

  describe('findOne', () => {
    it(`should return a single address`, async () => {
      const response = await service.getAddressById(fakeAddresses[0].id);

      expect(response).toEqual(fakeAddresses[0]);
      expect(prisma.address.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.address.findUnique).toHaveBeenCalledWith({
        where: { id: fakeAddresses[0].id },
      });
    });
  });

  describe('create', () => {
    it(`should create a new address`, async () => {
      const response = await service.createAddress(fakeAddresses[0]);

      expect(response).toBe(fakeAddresses[0]);
      expect(prisma.address.create).toHaveBeenCalledTimes(1);
      expect(prisma.address.create).toHaveBeenCalledWith({
        data: fakeAddresses[0],
      });
    });
  });

  describe('updateOne', () => {
    const updateAddressDto = {
      street: faker.location.street(),
      postalCode: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
    };

    it(`should update a single address`, async () => {
      const response = await service.updateAddress(
        fakeAddresses[0].id,
        updateAddressDto,
      );

      expect(response).toEqual(fakeAddresses[0]);
      expect(prisma.address.update).toHaveBeenCalledTimes(1);
      expect(prisma.address.update).toHaveBeenCalledWith({
        where: { id: fakeAddresses[0].id },
        data: updateAddressDto,
      });
    });
  });

  describe('deleteOne', () => {
    it(`should delete address by id`, async () => {
      expect(await service.deleteAddress(fakeAddresses[0].id)).toBeUndefined();
      expect(prisma.address.delete).toHaveBeenCalledTimes(1);
      expect(prisma.address.delete).toHaveBeenCalledWith({
        where: { id: fakeAddresses[0].id },
      });
    });
  });
});
