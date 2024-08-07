import {
    Injectable,
    OnModuleInit,
    OnModuleDestroy,
    Logger,
} from "@nestjs/common";
import { RedisClientType, createClient } from "redis";

@Injectable()
export class RedisCacheService implements OnModuleInit, OnModuleDestroy {
    private client: RedisClientType; // Use generic type if specific types cause issues
    private readonly logger = new Logger(RedisCacheService.name);

    async onModuleInit() {
        try {
            this.client = await this.connectRedis();
            this.logger.log("Redis client connected successfully");
        } catch (error) {
            this.logger.error("Error initializing Redis client111", error);
        }
    }

    async onModuleDestroy() {
        if (this.client) {
            await this.client.quit();
            this.logger.log("Redis client disconnected successfully");
        }
    }

    private async connectRedis(): Promise<any> {
        const client = createClient({
            password: "oaE83SilDq1rCJYMae6tL44uJiZEfYIK",
            socket: {
                host: "redis-17203.c302.asia-northeast1-1.gce.redns.redis-cloud.com",
                port: 17203,
            },
        });

        client.on("error", (err) =>
            this.logger.error("Redis Client Error", err),
        );

        await client.connect();

        return client;
    }

    async get(key: string): Promise<string | null> {
        if (!this.client) {
            throw new Error("Redis client is not initialized");
        }

        if (typeof key !== "string") {
            throw new TypeError("Key must be a string");
        }

        try {
            const value = await this.client.get(key);
            return JSON.parse(value);
        } catch (error) {
            this.logger.error(`Error retrieving value for key "${key}"`, error);
            throw error;
        }
    }

    async set(
        key: string,
        value: string | any[],
        ttl: number = 3600,
    ): Promise<void> {
        if (!this.client) {
            throw new Error("Redis client is not initialized");
        }

        if (typeof key !== "string") {
            throw new TypeError("Key must be a string");
        }
        const valueToStore =
            typeof value === "string" ? value : JSON.stringify(value);

        try {
            await this.client.set(key, valueToStore, { EX: ttl });
        } catch (error) {
            this.logger.error(`Error setting value for key "${key}"`, error);
            throw error;
        }
    }
}
