import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  // Listar todos los servicios de un Tenant específico
  async findAllByTenant(tenantId: string) {
    return this.prisma.service.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    const service = await this.prisma.service.findFirst({
      where: { id, tenantId },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} for tenant ${tenantId} not found`);
    }

    return service;
  }

  async update(id: string, tenantId: string, updateServiceDto: UpdateServiceDto) {
    await this.findOne(id, tenantId);

    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async remove(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    
    // Podríamos usar Soft Delete en el futuro, por ahora es físico
    return this.prisma.service.delete({
      where: { id },
    });
  }
}
