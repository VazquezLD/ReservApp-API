import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { PrismaService } from '../prisma/prisma.service';
import { TenantContext } from '../prisma/tenant-context.service';
import { NotFoundException } from '@nestjs/common';

describe('ServicesService', () => {
  let service: ServicesService;
  let prisma: PrismaService;
  let tenantContext: TenantContext;

  const mockPrisma = {
    service: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      updateMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  const mockTenantContext = {
    getTenantId: jest.fn().mockReturnValue('tenant-1'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
        {
          provide: TenantContext,
          useValue: mockTenantContext,
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    prisma = module.get<PrismaService>(PrismaService);
    tenantContext = module.get<TenantContext>(TenantContext);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a service if found and matches tenantId', async () => {
      const mockResult = { id: '1', name: 'Test Service', tenantId: 'tenant-1' };
      mockPrisma.service.findFirst.mockResolvedValue(mockResult);

      const result = await service.findOne('1');
      expect(result).toEqual(mockResult);
      expect(prisma.service.findFirst).toHaveBeenCalledWith({
        where: { id: '1', tenantId: 'tenant-1' },
      });
    });

    it('should throw NotFoundException if service not found for the tenant', async () => {
      mockPrisma.service.findFirst.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all services for a specific tenant', async () => {
      const mockServices = [
        { id: '1', name: 'Service 1', tenantId: 'tenant-1' },
        { id: '2', name: 'Service 2', tenantId: 'tenant-1' },
      ];
      mockPrisma.service.findMany.mockResolvedValue(mockServices);

      const result = await service.findAll();
      expect(result).toHaveLength(2);
      expect(prisma.service.findMany).toHaveBeenCalledWith({
        where: { tenantId: 'tenant-1' },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
