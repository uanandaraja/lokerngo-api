import { Hono } from "hono";
import { Env } from "../../env";
import jobsRouter from "./jobs/routes";

const v1Router = new Hono<{ Bindings: Env }>();

v1Router.route("/jobs", jobsRouter);

export default v1Router;
