import { Hono } from "hono";
import { Env } from "./env";
import { getDbClient } from "./db";
import { jobs } from "./db/schema";

const app = new Hono<{ Bindings: Env }>();

app.get("/", async (c) => {
  return c.text("Hello, Hono!");
});

app.get("/jobs", async (c) => {
  try {
    const db = getDbClient(c.env);
    const allJobs = await db.select().from(jobs);
    return c.json(allJobs);
  } catch (error) {
    console.error("Database error:", error);
    return c.text("Error connecting to the database", 500);
  }
});

export default app;
