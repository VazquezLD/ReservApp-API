import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsModule } from './tenants/tenants.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [PrismaModule, TenantsModule, ServicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
