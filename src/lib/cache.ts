type Entry<T> = { value: T; expiresAt: number };

export class TtlCache {
  private store = new Map<string, Entry<unknown>>();

  constructor(private ttlMs: number) {}

  get<T>(key: string): T | undefined {
    const hit = this.store.get(key);
    if (!hit) return undefined;
    if (Date.now() > hit.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return hit.value as T;
  }

  set<T>(key: string, value: T): T {
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
    return value;
  }

  async wrap<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== undefined) return cached;
    return this.set(key, await fn());
  }
}
