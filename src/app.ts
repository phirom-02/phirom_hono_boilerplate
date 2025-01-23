import { Hono } from "hono";

import db from "@/db";
import { tasks } from "@/db/schema";

import { pinoLogger } from "./shared/middlewares/pino-logger";

const app = new Hono();

app.use(pinoLogger());

app.get("/", async (c) => {
  const _tasks = await db.select().from(tasks);

  return c.json({ content: _tasks });
});

export default app;
