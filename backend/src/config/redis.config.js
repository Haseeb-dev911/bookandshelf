import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URL,
});

redis.on("connect", () => console.log("Redis connected 🟢"));
redis.on("error", (error) => console.log("Redis Error: ", error));

export const connectRedis = async () => {
    await redis.connect();
}

export default redis;