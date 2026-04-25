import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  // Este método es agnóstico al canal (WhatsApp, Email, etc.)
  async sendBookingConfirmation(
    customerName: string,
    customerPhone: string,
    customerEmail: string,
    token: string,
    bookingId: string
  ) {
    const confirmationUrl = `https://mi-app.com/confirm/${bookingId}?token=${token}`;

    // Lógica para WhatsApp (Simulada)
    this.logger.log(`[SIMULACIÓN WHATSAPP] Enviando mensaje a ${customerPhone}: Hola ${customerName}, confirma tu turno aquí: ${confirmationUrl}`);

    // Lógica para Email (Simulada)
    this.logger.log(`[SIMULACIÓN EMAIL] Enviando correo a ${customerEmail}: Asunto: Confirma tu Reserva. Enlace: ${confirmationUrl}`);

    // Aquí es donde en el futuro inyectarás la llamada a Axios para Twilio, Evolution API, etc.
    return { sent: true };
  }
}
