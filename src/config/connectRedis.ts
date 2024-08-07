import { createClient } from "redis";

export const connectRedis = async () => {
    const client = createClient({
        password: "3g8UnHQaXZXBfCU0CuijcgQewidAcVov",
        socket: {
            host: "redis-17440.c124.us-central1-1.gce.redns.redis-cloud.com",
            port: 17440,
        },
    });
    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    return client;
};
