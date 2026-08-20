import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { resolve } from "node:path";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createLocalClient() {
  const configuredUrl = process.env.DATABASE_URL || "file:./dev.db";
  const url = configuredUrl.startsWith("file:./")
    ? `file:${resolve(process.cwd(), "prisma", configuredUrl.slice("file:./".length))}`
    : configuredUrl;

  return new PrismaClient({
    adapter: new PrismaLibSQL({ url }),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });
}

function getCloudflareD1Client() {
  try {
    // Dynamic require so non-Cloudflare environments (Vercel) do not fail static evaluation
    const { getCloudflareContext } = require("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const d1 = (env as { DB?: unknown }).DB;

    if (!d1) return null;

    return new PrismaClient({
      adapter: new PrismaD1(d1 as never),
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
    });
  } catch {
    return null;
  }
}

function getClient() {
  const configuredUrl = process.env.DATABASE_URL || "file:./dev.db";
  if (!configuredUrl.startsWith("file:")) {
    const cloudflareClient = getCloudflareD1Client();
    if (cloudflareClient) return cloudflareClient;
  }

  globalForPrisma.prisma ??= createLocalClient();
  return globalForPrisma.prisma;
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  }
});
