import redisConfig from "@config/redis";
import Redis, { Redis as RedisClient } from "ioredis";
import { ICacheProvider } from "../models/ICacheProvider";

export class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;
  private connected: boolean = false;

  constructor() {
    if (!this.connected) {
      this.client = new Redis(redisConfig.redis);
      this.connected = true;
    }
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
