import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingStatus } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { serviceId, startTime, customerName, customerEmail, customerPhone } = createBookingDto;
    
    // El tenantId debe venir del contexto (si es admin) o resolverse si es público
    let tenantId = this.prisma.tenantContext.getTenantId();

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) throw new NotFoundException('Servicio no encontrado');
    
    // Si es una reserva pública, tomamos el tenantId del servicio
    if (!tenantId) tenantId = service.tenantId;

    const start = new Date(startTime);
    const end = new Date(start.getTime() + service.duration * 60000);

    // Evitar solapamientos
    const overlapping = await this.prisma.booking.findFirst({
      where: {
        tenantId,
        status: { in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] },
        OR: [{ startTime: { lt: end }, endTime: { gt: start } }],
      },
    });

    if (overlapping) throw new BadRequestException('El horario ya está ocupado');

    const booking = await this.prisma.booking.create({
      data: {
        startTime: start,
        endTime: end,
        customerName,
        customerEmail,
        customerPhone,
        serviceId,
        tenantId,
        status: BookingStatus.PENDING,
        validationToken: Math.random().toString(36).substring(2, 15),
        expiresAt: new Date(Date.now() + 15 * 60000),
      },
    });

    this.notificationsService.sendBookingConfirmation(
      booking.customerName,
      booking.customerPhone || '',
      booking.customerEmail,
      booking.validationToken!,
      booking.id
    );

    return booking;
  }

  async findAll() {
    const tenantId = this.prisma.tenantContext.getTenantId();
    return this.prisma.booking.findMany({
      where: { tenantId },
      include: { service: true },
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(id: string) {
    const tenantId = this.prisma.tenantContext.getTenantId();
    const booking = await this.prisma.booking.findFirst({
      where: { id, tenantId },
      include: { service: true },
    });

    if (!booking) throw new NotFoundException('Reserva no encontrada');
    return booking;
  }

  async confirm(id: string, token: string) {
    const booking = await this.prisma.booking.findFirst({ where: { id, validationToken: token } });
    if (!booking) throw new BadRequestException('Token inválido');

    return this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CONFIRMED },
    });
  }

  async updateStatus(id: string, status: BookingStatus) {
    const tenantId = this.prisma.tenantContext.getTenantId();
    if (!tenantId) throw new BadRequestException('Tenant ID no encontrado en el contexto');

    const booking = await this.prisma.booking.findFirst({
      where: { id, tenantId },
    });

    if (!booking) throw new NotFoundException('Reserva no encontrada');

    return this.prisma.booking.update({
      where: { id },
      data: { status },
    });
  }
}
