import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

@Injectable()
export class TenantContext {
  private static readonly storage = new AsyncLocalStorage<string>();

  runWithTenantId<T>(tenantId: string, callback: () => T): T {
    return TenantContext.storage.run(tenantId, callback);
  }

  getTenantId(): string | undefined {
    return TenantContext.storage.getStore();
  }
}
