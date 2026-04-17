import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ServicesService', () => {
  let service: ServicesService;
  let prisma: PrismaService;

  const mockPrisma = {
    service: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a service if found and matches tenantId', async () => {
      const mockResult = { id: '1', name: 'Test Service', tenantId: 'tenant-1' };
      mockPrisma.service.findFirst.mockResolvedValue(mockResult);

      const result = await service.findOne('1', 'tenant-1');
      expect(result).toEqual(mockResult);
      expect(prisma.service.findFirst).toHaveBeenCalledWith({
        where: { id: '1', tenantId: 'tenant-1' },
      });
    });

    it('should throw NotFoundException if service not found for the tenant', async () => {
      mockPrisma.service.findFirst.mockResolvedValue(null);

      await expect(service.findOne('1', 'tenant-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllByTenant', () => {
    it('should return all services for a specific tenant', async () => {
      const mockServices = [
        { id: '1', name: 'Service 1', tenantId: 'tenant-1' },
        { id: '2', name: 'Service 2', tenantId: 'tenant-1' },
      ];
      mockPrisma.service.findMany.mockResolvedValue(mockServices);

      const result = await service.findAllByTenant('tenant-1');
      expect(result).toHaveLength(2);
      expect(prisma.service.findMany).toHaveBeenCalledWith({
        where: { tenantId: 'tenant-1' },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
