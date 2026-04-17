import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

// Omitimos tenantId en la actualización por seguridad, no debería cambiar
export class UpdateServiceDto extends PartialType(OmitType(CreateServiceDto, ['tenantId'])) {}
