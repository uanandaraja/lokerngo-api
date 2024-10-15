import { Hono } from "hono";
import { Env } from "../../../env";
import * as handlers from "./handlers";

const jobsRouter = new Hono<{ Bindings: Env }>();

jobsRouter.get("/", handlers.getAllJobs);
jobsRouter.get("/:id", handlers.getJobById);

export default jobsRouter;
