import type { Config } from "drizzle-kit";

const config: Config = {
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "", // This will be populated at runtime
  },
};

export default config;
