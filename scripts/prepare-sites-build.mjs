import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const workerBundle = resolve(root, ".open-next", "wrangler-bundle");
const worker = resolve(workerBundle, "worker.js");
const assets = resolve(root, ".open-next", "assets");
const migrations = resolve(root, "drizzle");
const hostingConfig = resolve(root, ".openai", "hosting.json");
const prismaCompiler = resolve(root, "node_modules", ".prisma", "client", "query_compiler_bg.wasm");
const dist = resolve(root, "dist");

if (!existsSync(worker) || !existsSync(assets) || !existsSync(hostingConfig) || !existsSync(prismaCompiler)) {
  throw new Error("Run the OpenNext and Wrangler dry-run builds before preparing Sites output.");
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(resolve(dist, "server"), { recursive: true });
mkdirSync(resolve(dist, "assets"), { recursive: true });
mkdirSync(resolve(dist, ".openai", "drizzle"), { recursive: true });
mkdirSync(resolve(dist, "node_modules", ".prisma", "client"), { recursive: true });

cpSync(worker, resolve(dist, "server", "index.js"));
for (const entry of readdirSync(workerBundle, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".wasm")) {
    cpSync(resolve(workerBundle, entry.name), resolve(dist, "server", entry.name));
  }
}
cpSync(assets, resolve(dist, "assets"), { recursive: true });
cpSync(migrations, resolve(dist, ".openai", "drizzle"), { recursive: true });
cpSync(hostingConfig, resolve(dist, ".openai", "hosting.json"));
cpSync(prismaCompiler, resolve(dist, "node_modules", ".prisma", "client", "query_compiler_bg.wasm"));
