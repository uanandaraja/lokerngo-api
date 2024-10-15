import { Hono } from "hono";
import { Env } from "./env";
import v1Router from "./api/v1";

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => c.text("Welcome to Loker API"));

app.route("/api/v1", v1Router);

export default app;
