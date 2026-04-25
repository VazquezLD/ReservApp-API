import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { format, addMinutes, startOfDay, endOfDay, isAfter, isBefore, parseISO } from 'date-fns';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async getAvailableSlots(tenantSlug: string, serviceId: string, dateStr: string) {
    // 1. Resolver Tenant
    const tenant = await this.prisma.tenant.findUnique({ where: { slug: tenantSlug } });
    if (!tenant) throw new NotFoundException('Negocio no encontrado');

    // 2. Resolver Servicio
    const service = await this.prisma.service.findFirst({ where: { id: serviceId, tenantId: tenant.id } });
    if (!service) throw new NotFoundException('Servicio no encontrado');

    // 3. Normalizar Fecha (extraer solo YYYY-MM-DD)
    const date = parseISO(dateStr);
    const dayOfWeek = date.getDay();
    const dateOnly = format(date, 'yyyy-MM-dd');

    // 4. Obtener Horarios de Atención
    const businessHours = await this.prisma.businessHours.findFirst({
      where: { tenantId: tenant.id, dayOfWeek },
    });

    // Si no abre este día, no hay slots
    if (!businessHours) return [];

    // 5. Obtener Reservas Existentes para ese día
    const existingBookings = await this.prisma.booking.findMany({
      where: {
        tenantId: tenant.id,
        startTime: { gte: startOfDay(date), lte: endOfDay(date) },
        status: { in: ['CONFIRMED', 'PENDING'] },
      },
    });

    // 6. Generar Slots
    const slots: string[] = [];
    // Construimos la hora de inicio y fin real para ese día específico
    let current = new Date(`${dateOnly}T${businessHours.openTime}:00`);
    const end = new Date(`${dateOnly}T${businessHours.closeTime}:00`);

    // El intervalo entre slots (default 30 min)
    const interval = tenant.slotInterval || 30;

    while (isBefore(current, end)) {
      const slotEnd = addMinutes(current, service.duration);
      
      // No puede terminar después de la hora de cierre
      if (isAfter(slotEnd, end)) break;

      // Comprobar si el slot está ocupado por alguna reserva
      const isOccupied = existingBookings.some(b => {
        const bStart = new Date(b.startTime);
        const bEnd = new Date(b.endTime);
        // Hay solapamiento si: (Inicio < bFin) Y (Fin > bInicio)
        return isBefore(current, bEnd) && isAfter(slotEnd, bStart);
      });

      if (!isOccupied) {
        slots.push(current.toISOString());
      }

      current = addMinutes(current, interval);
    }

    return slots;
  }
}
