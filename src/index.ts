import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/", (c) => {
  return c.json({ hello: "Hello Hono!" });
});

export default app;

