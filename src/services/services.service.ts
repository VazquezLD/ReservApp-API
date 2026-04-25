import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    const tenantId = this.prisma.tenantContext.getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found');

    return this.prisma.service.create({
      data: {
        ...createServiceDto,
        tenantId,
      },
    });
  }

  async findAll() {
    const tenantId = this.prisma.tenantContext.getTenantId();
    return this.prisma.service.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const tenantId = this.prisma.tenantContext.getTenantId();
    const service = await this.prisma.service.findFirst({
      where: { id, tenantId },
    });

    if (!service) {
      throw new NotFoundException(`Servicio no encontrado`);
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const tenantId = this.prisma.tenantContext.getTenantId();
    return this.prisma.service.updateMany({
      where: { id, tenantId },
      data: updateServiceDto,
    });
  }

  async remove(id: string) {
    const tenantId = this.prisma.tenantContext.getTenantId();
    return this.prisma.service.deleteMany({
      where: { id, tenantId },
    });
  }
}
