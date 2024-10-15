import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  contractType: varchar("contract_type", { length: 100 }),
  location: varchar("location", { length: 255 }),
  vacancyExpiry: varchar("vacancy_expiry", { length: 255 }),
  jobContent: text("job_content").notNull(),
});
