import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsModule } from './tenants/tenants.module';
import { ServicesModule } from './services/services.module';
import { BookingsModule } from './bookings/bookings.module';
import { TenantMiddleware } from './prisma/tenant.middleware';
import { BusinessHoursModule } from './business-hours/business-hours.module';
import { AvailabilityModule } from './availability/availability.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [PrismaModule, TenantsModule, ServicesModule, BookingsModule, BusinessHoursModule, AvailabilityModule, UsersModule, AuthModule, NotificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude(
        { path: 'tenants', method: RequestMethod.POST },
        { path: 'tenants/(.*)', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
