import { createClient } from "redis";

let redisClient = null;
let connectionPromise = null;

function getRedisUrl() {
  return (
    process.env.REDIS_URL ||
    "redis://127.0.0.1:6379"
  );
}

export function getRedisClient() {
  if (!redisClient) {
    redisClient =
      createClient({
        url: getRedisUrl(),
      });

    redisClient.on(
      "error",
      (error) => {
        console.error(
          "[Redis]",
          error
        );
      }
    );

    redisClient.on(
      "connect",
      () => {
        console.info(
          "[Redis] connecting..."
        );
      }
    );

    redisClient.on(
      "ready",
      () => {
        console.info(
          "[Redis] ready"
        );
      }
    );

    redisClient.on(
      "end",
      () => {
        console.info(
          "[Redis] connection closed"
        );
      }
    );
  }

  return redisClient;
}

export async function connectRedis() {
  const client =
    getRedisClient();

  if (client.isOpen) {
    return client;
  }

  if (!connectionPromise) {
    connectionPromise =
      client
        .connect()
        .then(() => client)
        .finally(() => {
          connectionPromise =
            null;
        });
  }

  return connectionPromise;
}

export async function disconnectRedis() {
  const client =
    getRedisClient();

  if (!client.isOpen) {
    return;
  }

  await client.quit();
}

export async function checkRedis() {
  const client =
    await connectRedis();

  const result =
    await client.ping();

  return result === "PONG";
}

export default getRedisClient;