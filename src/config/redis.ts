import { RedisOptions } from "ioredis";

interface IRedisConfig {
  redis: RedisOptions;
}
export default {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS || undefined,
  },
} as IRedisConfig;
