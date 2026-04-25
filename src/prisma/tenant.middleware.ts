import 'dotenv/config';
import { Injectable, NestMiddleware, BadRequestException, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantContext } from './tenant-context.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private prisma = new PrismaClient();
  private slugCache = new Map<string, string>(); // Cache simple: slug -> id

  constructor(private readonly tenantContext: TenantContext) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl || req.url;
    console.log(`[TenantMiddleware] Procesando ruta: ${url}`);

    // EXCEPCIÓN: Rutas que NO deben filtrar por Tenant
    if (url.includes('/auth/') || url.includes('/tenants')) {
      return next();
    }

    let tenantId = (req.headers['x-tenant-id'] || req.headers['X-Tenant-Id'] || req.query['tenantId']) as string;
    const tenantSlug = (req.headers['x-tenant-slug'] || req.headers['X-Tenant-Slug'] || req.query['tenantSlug']) as string;

    // 1. Si tenemos ID, lo establecemos y continuamos
    if (tenantId) {
      return this.tenantContext.runWithTenantId(tenantId, () => next());
    }

    // 2. Si no hay ID pero hay Slug, resolvemos el ID primero
    if (tenantSlug) {
      if (this.slugCache.has(tenantSlug)) {
        tenantId = this.slugCache.get(tenantSlug)!;
      } else {
        const tenant = await this.prisma.tenant.findUnique({
          where: { slug: tenantSlug },
          select: { id: true },
        });

        if (!tenant) {
          throw new NotFoundException(`Negocio "${tenantSlug}" no encontrado`);
        }

        tenantId = tenant.id;
        this.slugCache.set(tenantSlug, tenantId);
      }
      return this.tenantContext.runWithTenantId(tenantId, () => next());
    }

    // 3. Si no hay nada, lanzamos error (excepto en rutas públicas ya excluidas arriba)
    throw new BadRequestException('Se requiere identificación del negocio (ID o Slug)');
  }
}
