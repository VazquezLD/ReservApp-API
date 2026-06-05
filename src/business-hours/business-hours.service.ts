import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TenantContext } from '../prisma/tenant-context.service';
import { CreateBusinessHourDto } from './dto/create-business-hour.dto';
import { UpdateBusinessHourDto } from './dto/update-business-hour.dto';

@Injectable()
export class BusinessHoursService {
  constructor(
    private prisma: PrismaService,
    private tenantContext: TenantContext
  ) {}

  async create(createBusinessHourDto: CreateBusinessHourDto) {
    const tenantId = this.tenantContext.getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found in context');

    const { dayOfWeek, openTime, closeTime } = createBusinessHourDto;
    
    // Verificar si ya existe usando el índice único compuesto
    const existing = await this.prisma.businessHours.findFirst({
      where: { tenantId, dayOfWeek },
    });

    if (existing) {
      // Si existe, lo actualizamos en lugar de fallar
      return this.update(existing.id, { openTime, closeTime });
    }

    return this.prisma.businessHours.create({
      data: {
        dayOfWeek,
        openTime,
        closeTime,
        tenantId,
      },
    });
  }

  async findAll() {
    const tenantId = this.tenantContext.getTenantId();
    return this.prisma.businessHours.findMany({
      where: { tenantId },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  async findOne(id: string) {
    const tenantId = this.tenantContext.getTenantId();
    const businessHour = await this.prisma.businessHours.findFirst({
      where: { id, tenantId },
    });

    if (!businessHour) {
      throw new NotFoundException(`Horario no encontrado`);
    }

    return businessHour;
  }

  async update(id: string, updateBusinessHourDto: UpdateBusinessHourDto) {
    const tenantId = this.tenantContext.getTenantId();
    return this.prisma.businessHours.updateMany({
      where: { id, tenantId },
      data: updateBusinessHourDto,
    });
  }

  async remove(id: string) {
    const tenantId = this.tenantContext.getTenantId();
    return this.prisma.businessHours.deleteMany({
      where: { id, tenantId },
    });
  }
}
