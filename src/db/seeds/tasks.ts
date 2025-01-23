import * as schema from "@/db/schema";

import type { Db } from "..";

import tasks from "./data/tasks.json";

export default async function seed(db: Db) {
  await Promise.all(
    tasks.map(async (task) => {
      await db.insert(schema.tasks).values(task);
    }),
  );
}
