import { Context } from "hono";
import { Env } from "../../../env";
import { getDbClient } from "../../../db";
import { jobs } from "../../../db/schema";
import { sql } from "drizzle-orm";

export async function getAllJobs(c: Context<{ Bindings: Env }>) {
  try {
    const db = getDbClient(c.env);

    // Get the page number from the query parameter, default to 1 if not provided
    const page = parseInt(c.req.query("page") || "1", 10);

    // Set items per page
    const itemsPerPage = 6;

    // Calculate the offset
    const offset = (page - 1) * itemsPerPage;

    // Get total count of jobs
    const [{ count }] = await db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(jobs);

    // Get paginated jobs
    const paginatedJobs = await db
      .select()
      .from(jobs)
      .limit(itemsPerPage)
      .offset(offset);

    // Calculate total pages
    const totalPages = Math.ceil(count / itemsPerPage);

    return c.json({
      jobs: paginatedJobs,
      currentPage: page,
      totalPages: totalPages,
      totalJobs: count,
    });
  } catch (error) {
    console.error("Database error:", error);
    return c.text("Error connecting to the database", 500);
  }
}

export async function getJobById(c: Context<{ Bindings: Env }>) {
  try {
    const db = getDbClient(c.env);
    const id = parseInt(c.req.param("id"), 10);

    if (isNaN(id)) {
      return c.json({ error: "Invalid job ID" }, 400);
    }

    const job = await db
      .select()
      .from(jobs)
      .where(sql`${jobs.id} = ${id}`)
      .limit(1);

    if (job.length === 0) {
      return c.json({ error: "Job not found" }, 404);
    }

    return c.json(job[0]);
  } catch (error) {
    console.error("Database error:", error);
    return c.text("Error connecting to the database", 500);
  }
}
