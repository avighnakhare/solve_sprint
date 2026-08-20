import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();
config.buildCommand = "npm run build:next";
config.edgeExternals = [
  "node:crypto",
  "sharp",
  "@img/sharp-wasm32",
  "@img/sharp-win32-x64",
  "@emnapi/runtime"
];

export default config;
