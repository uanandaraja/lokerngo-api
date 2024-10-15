import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Env } from "../env";

export * from "./schema";

export function getDbClient(env: Env) {
  const connectionString = env.DATABASE_URL;
  const client = postgres(connectionString);
  return drizzle(client);
}
