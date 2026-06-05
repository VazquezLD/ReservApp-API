import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHoursService } from './business-hours.service';
import { PrismaService } from '../prisma/prisma.service';
import { TenantContext } from '../prisma/tenant-context.service';

describe('BusinessHoursService', () => {
  let service: BusinessHoursService;

  const mockPrisma = {};
  const mockTenantContext = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessHoursService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TenantContext, useValue: mockTenantContext },
      ],
    }).compile();

    service = module.get<BusinessHoursService>(BusinessHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
