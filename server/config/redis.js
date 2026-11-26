import Redis from "ioredis";

let redisClient = null;

function getRedisUrl() {
  return process.env.REDIS_URL || "redis://127.0.0.1:6379";
}

export function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis(getRedisUrl(), {
      lazyConnect: true,
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
    });

    redisClient.on("error", (error) => {
      console.error("[Redis]", error);
    });

    redisClient.on("connect", () => {
      console.info("[Redis] connecting...");
    });

    redisClient.on("ready", () => {
      console.info("[Redis] ready");
    });

    redisClient.on("close", () => {
      console.info("[Redis] connection closed");
    });
  }

  return redisClient;
}

export async function connectRedis() {
  let client = getRedisClient();

  // A client that was quit cannot be reconnected; create a fresh instance.
  if (client.status === "end") {
    redisClient = null;
    client = getRedisClient();
  }

  if (client.status === "wait") {
    await client.connect();
  }

  return client;
}

export async function disconnectRedis() {
  if (!redisClient || redisClient.status === "end") return;

  const client = redisClient;
  redisClient = null;
  await client.quit();
}

export async function checkRedis() {
  const client = await connectRedis();
  return (await client.ping()) === "PONG";
}

export default getRedisClient;
